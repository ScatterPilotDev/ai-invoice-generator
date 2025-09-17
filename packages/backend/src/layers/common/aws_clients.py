import boto3
import os

# Initialize clients once and reuse them
bedrock_runtime = boto3.client(service_name='bedrock-runtime')
dynamodb = boto3.resource('dynamodb')

# Get table name from environment variables
DYNAMODB_TABLE_NAME = os.environ.get('DYNAMODB_TABLE')
table = dynamodb.Table(DYNAMODB_TABLE_NAME)
