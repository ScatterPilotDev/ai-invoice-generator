"use client";

import { useState } from 'react';

export default function HomePage() {
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  
  // New state variables for loading and error messages
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState('');

  const handleGenerateInvoice = async () => {
    // Start loading and clear previous response
    setIsLoading(true);
    setApiResponse('');

    try {
      // 1. Send the form data to our API endpoint.
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientName, description, amount }),
      });

      // 2. Get the response from the server.
      const result = await response.json();

      if (!response.ok) {
        // If the server returned an error, show it
        throw new Error(result.error || 'Something went wrong');
      }
      
      // 3. Display the successful response from the server.
      setApiResponse(JSON.stringify(result, null, 2));

    } catch (error: any) {
      // Display any errors that occur during the fetch
      setApiResponse(`Error: ${error.message}`);
    } finally {
      // Stop loading, whether successful or not
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">AI Invoice Generator</h1>

        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm flex flex-col gap-6">
          {/* ... all the input fields remain the same ... */}
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Client Name
            </label>
            <input
              type="text"
              id="clientName"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., Acme Corporation"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Or just type your prompt here
            </label>
            <textarea
              id="description"
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., Invoice John Doe for 10 hours of consulting at $150/hour."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., 1500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <button 
            onClick={handleGenerateInvoice}
            // Disable the button while loading
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
          >
            {/* Show a loading message */}
            {isLoading ? 'Generating...' : 'Generate Invoice'}
          </button>

          {/* This now displays the response from our API server */}
          {apiResponse && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">API Server Response:</h3>
              <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                <code>{apiResponse}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
