import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // 1. Get the Backend API URL from environment variables
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!backendUrl) {
      throw new Error("API base URL is not configured.");
    }

    // 2. Forward the prompt to your Python backend
    const response = await fetch(`${backendUrl}/invoices`, { // Assuming the endpoint is /invoices
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Pass the user's prompt in the 'message' field as the Python handler expects
      body: JSON.stringify({ message: prompt }),
    });

    if (!response.ok) {
      // If the backend returns an error, forward it to the client
      const errorData = await response.text();
      return NextResponse.json({ error: `Backend Error: ${errorData}` }, { status: response.status });
    }

    // 3. Get the JSON response from the backend and send it back to the client
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
