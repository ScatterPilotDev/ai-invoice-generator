import { NextResponse } from 'next/server';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// Initialize the Bedrock client
const client = new BedrockRuntimeClient({ region: "us-east-1" });
const modelId = "anthropic.claude-3-5-sonnet-20240620-v1:0";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { description } = body; // We only need the description/prompt now

    if (!description) {
      return NextResponse.json({ error: 'Description prompt is required' }, { status: 400 });
    }

    // 1. Construct a detailed prompt for the AI
    const prompt = `You are an expert invoice generator. A user is providing a prompt to create an invoice. 
    Your task is to analyze the user's prompt and extract the key details into a structured JSON object.
    The user's prompt is: "${description}"

    Please return a JSON object with the following structure:
    {
      "clientName": "The name of the client being invoiced",
      "lineItems": [
        {
          "description": "A description of a single service or product",
          "quantity": 1,
          "price": 50.00
        }
      ],
      "totalAmount": 1500.00
    }

    Analyze the user's prompt carefully to determine the client's name, the individual line items (description, quantity, price), and the total amount.
    If the prompt is simple, you can create a single line item. If the prompt is more complex, break it down into multiple line items.
    Only return the JSON object, with no other text or explanation.`;

    // 2. Prepare the request payload for the Bedrock API
    const bedrockRequestBody = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: prompt }],
        },
      ],
    };

    // 3. Create the InvokeModel command and send it to Bedrock
    const command = new InvokeModelCommand({
      modelId,
      body: JSON.stringify(bedrockRequestBody),
      contentType: "application/json",
      accept: "application/json",
    });

    const response = await client.send(command);

    // 4. Decode and parse the response from the AI model
    const decodedResponseBody = new TextDecoder().decode(response.body);
    const responseBody = JSON.parse(decodedResponseBody);
    const aiResponse = responseBody.content[0].text;
    
    // 5. Send the AI's structured JSON response back to the frontend
    return NextResponse.json(JSON.parse(aiResponse), { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'An unexpected error occurred while calling the AI.' }, { status: 500 });
  }
}
