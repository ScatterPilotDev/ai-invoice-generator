import json
import os
import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE')
table = dynamodb.Table(table_name)

def handler(event, context):
    try:
        claims = event['requestContext']['authorizer']['jwt']['claims']
        user_sub = claims['sub']
        user_email = claims['email']

        item = {
            'PK': f"TENANT#{user_sub}",
            'SK': 'PROFILE',
            'email': user_email,
            'createdAt': datetime.utcnow().isoformat()
        }

        table.put_item(Item=item)

        return {
            "statusCode": 201,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": "Profile created successfully", "userId": user_sub})
        }
    except Exception as e:
        print(f"Error: {e}")
        return {"statusCode": 500, "body": json.dumps({"message": "Internal server error"})}