from datetime import datetime, timedelta
from .aws_clients import table

def get_conversation_history(pk, sk):
    """Retrieves conversation history from DynamoDB."""
    try:
        response = table.get_item(Key={'PK': pk, 'SK': sk})
        return response.get('Item', {}).get('history', [])
    except Exception as e:
        print(f"DynamoDB get_item error: {e}")
        return []

def save_conversation_history(pk, sk, history):
    """Saves updated conversation history to DynamoDB with a 24-hour TTL."""
    ttl_timestamp = int((datetime.now() + timedelta(hours=24)).timestamp())
    table.put_item(
        Item={
            'PK': pk,
            'SK': sk,
            'history': history,
            'updatedAt': datetime.utcnow().isoformat(),
            'ttl': ttl_timestamp
        }
    )
