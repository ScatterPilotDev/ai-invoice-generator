import json
from common import database, bedrock

def handler(event, context):
    print("HANDLER INVOKED") # <-- ADD THIS LINE
    try:
        # ... rest of the function
        claims = event['requestContext']['authorizer']['jwt']['claims']
        tenant_pk = f"TENANT#{claims['sub']}"
        
        body = json.loads(event.get('body', '{}'))
        user_message = body.get('message')
        session_id = body.get('session_id', 'default_session')
        conversation_sk = f"CONVERSATION#{session_id}"

        if not user_message:
            return {"statusCode": 400, "body": json.dumps({"message": "Error: message not provided"})}

        # 1. Retrieve history
        history = database.get_conversation_history(tenant_pk, conversation_sk)
        
        # 2. Add user message to history
        history.append({"role": "user", "content": [{"type": "text", "text": user_message}]})

        # ... inside the handler function ...

# 3. Get AI response
ai_response_text = bedrock.get_invoice_assistance(history)
print("AI RESPONSE:", ai_response_text) # <-- ADD THIS LINE
history.append({"role": "assistant", "content": [{"type": "text", "text": ai_response_text}]})

# ... rest of the code


        # 4. Save updated history
        database.save_conversation_history(tenant_pk, conversation_sk, history)

        return {
    "statusCode": 200,
    "headers": { ... },
    "body": json.dumps({"invoiceData": json.loads(ai_response_text)}) # <-- This sends a proper JSON object
}

    except Exception as e:
        print(f"Error: {e}")
        return {"statusCode": 500, "body": json.dumps({"message": "Internal server error"})}
