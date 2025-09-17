import json
from .aws_clients import bedrock_runtime

def get_invoice_assistance(conversation_history):
    """Invokes the Bedrock model to get the next step in the invoice conversation."""
    
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

    request_body = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 2048,
        "system": system_prompt,
        "messages": conversation_history
    }

    response = bedrock_runtime.invoke_model(
        body=json.dumps(request_body),
        modelId='anthropic.claude-3-5-sonnet-20240620-v1:0'
    )

    response_body = json.loads(response.get('body').read())
    return response_body.get('content')[0].get('text')
