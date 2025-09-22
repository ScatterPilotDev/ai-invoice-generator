"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    
    // Redirect to the chat page with the prompt as a URL query parameter
    const encodedPrompt = encodeURIComponent(prompt);
    router.push(`/chat?prompt=${encodedPrompt}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#111111] text-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
  Generate invoices <span className="text-purple-400">{'>'} instantly_</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
        You can&apos;t build a business without getting paid. Stop wasting time with templates.
        Just describe your invoice, and let AI handle the rest.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Invoice for 10 hours of design work..."
            className="flex-grow p-4 bg-[#222222] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors"
          >
            Generate My Invoice
          </button>
        </form>
      </div>
    </main>
  );
}
