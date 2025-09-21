import json
from .aws_clients import bedrock_runtime

def get_invoice_assistance(conversation_history):
    """Invokes the Bedrock model to get the next step in the invoice conversation."""
    
    system_prompt = """You are an expert invoicing assistant named 'Gennie'.
Your goal is to gather all necessary details from the user to create a complete invoice.

1.  **Interact first:** If the user's message is missing key details (like client name, specific line items with quantity and price, or a due date), ask clarifying questions to get the missing information. Be friendly and conversational.
2.  **Confirm when ready:** Once you believe you have all the necessary information, summarize it for the user and ask for confirmation to generate the invoice.
3.  **Return JSON only when confirmed:** After the user confirms the details are correct, and only then, respond with a valid JSON object representing the final state of the invoice. If a value is still not known, use null. Do not add any text outside of the final JSON object in your response.

Example JSON Structure:
{
  "clientName": "string",
  "dueDate": "YYYY-MM-DD",
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
