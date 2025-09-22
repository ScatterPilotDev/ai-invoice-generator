"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatInput from '@/components/ui/ChatInput';
import MessageHistory, { Message } from '@/components/ui/MessageHistory';
import Sidebar from '@/components/ui/Sidebar';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialPrompt = searchParams.get('prompt');
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
}, [searchParams]);


  const handleSendMessage = async (userMessage: string) => {
    const newUserMessage: Message = { sender: 'user', content: userMessage };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("DATA RECEIVED BY FRONTEND:", data); // <-- ADDED FOR DEBUGGING

      const newAiMessage: Message = { sender: 'ai', content: { invoiceData: data.invoiceData } };
      setMessages(prevMessages => [...prevMessages, newAiMessage]);

    } catch (error) {
      console.error("Failed to fetch invoice:", error);
      const errorMessageContent = error instanceof Error ? error.message : "An unknown error occurred.";
      const errorMessage: Message = { 
        sender: 'ai', 
        content: { 
          invoiceData: { 
            clientName: "Error", 
            invoiceDate: "", 
            lineItems: [{ description: errorMessageContent, quantity: 0, unitPrice: 0 }], 
            totalAmount: 0 
          } 
        } 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex flex-col flex-grow">
        <div className="flex-grow p-6 overflow-y-auto">
          <MessageHistory messages={messages} />
        </div>
        <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}
