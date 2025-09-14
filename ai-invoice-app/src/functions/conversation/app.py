import boto3
import json
import os
from datetime import datetime, timedelta

# Initialize clients
bedrock_runtime = boto3.client(service_name='bedrock-runtime')
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE')
table = dynamodb.Table(table_name)

def handler(event, context):
    try:
        # Get user's ID from the Cognito token
        claims = event['requestContext']['authorizer']['jwt']['claims']
        user_sub = claims['sub']
        tenant_pk = f"TENANT#{user_sub}"

        # Get the message and optional session_id from the request body
        body = json.loads(event.get('body', '{}'))
        user_message = body.get('message')
        session_id = body.get('session_id', 'default_session') # Use a default session for now
        conversation_sk = f"CONVERSATION#{session_id}"

        if not user_message:
            return {"statusCode": 400, "body": json.dumps({"message": "Error: message not provided"})}

        # 1. RETRIEVE CONVERSATION HISTORY FROM DYNAMODB
        conversation_history = []
        try:
            response = table.get_item(Key={'PK': tenant_pk, 'SK': conversation_sk})
            if 'Item' in response:
                conversation_history = response['Item'].get('history', [])
        except Exception as e:
            print(f"DynamoDB get_item error: {e}")
            # Continue with empty history if there's an error

        # Add the new user message to the history for the prompt
        conversation_history.append({"role": "user", "content": [{"type": "text", "text": user_message}]})

        # Define the system prompt (instructions for the AI)
        system_prompt = """You are an expert invoicing assistant named 'Gennie'.
        Your primary goal is to conversationally gather all necessary details from the user to create an invoice.
        Be friendly, concise, and helpful. At the end of every turn, you MUST return a valid JSON object representing the current state of the invoice based on the entire conversation.
        If a value is not yet known, use null. Do not add any text outside of the JSON object in your response.

        Example JSON Structure:
        {
          "clientName": "string | null",
          "dueDate": "YYYY-MM-DD | null",
          "lineItems": [
            { "description": "string", "quantity": "number", "unitPrice": "number" }
          ],
          "notes": "string | null"
        }
        """

        # 2. INVOKE THE BEDROCK MODEL WITH HISTORY
        request_body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2048,
            "system": system_prompt,
            "messages": conversation_history # Pass the entire conversation history
        }

        response = bedrock_runtime.invoke_model(
            body=json.dumps(request_body),
            modelId='anthropic.claude-3-5-sonnet-20240620-v1:0'
        )

        response_body = json.loads(response.get('body').read())
        ai_response_text = response_body.get('content')[0].get('text')

        # Add the AI's response to the history for saving
        conversation_history.append({"role": "assistant", "content": [{"type": "text", "text": ai_response_text}]})

        # 3. SAVE THE UPDATED CONVERSATION HISTORY TO DYNAMODB
        # Set a Time-to-Live (TTL) of 24 hours for the conversation record
        ttl_timestamp = int((datetime.now() + timedelta(hours=24)).timestamp())

        table.put_item(
            Item={
                'PK': tenant_pk,
                'SK': conversation_sk,
                'history': conversation_history,
                'updatedAt': datetime.utcnow().isoformat(),
                'ttl': ttl_timestamp
            }
        )
        
        # We assume the AI's response is the JSON object and return it directly
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": ai_response_text
        }

    except Exception as e:
        print(f"Error: {e}")
        return {"statusCode": 500, "body": json.dumps({"message": "Internal server error"})}
