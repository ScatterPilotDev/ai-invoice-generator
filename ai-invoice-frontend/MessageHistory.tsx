import React from 'react';
import InvoiceCard from './InvoiceCard'; // We will create this component next

// Define the shape of a single message object
export interface Message {
  sender: 'user' | 'ai';
  content: any; // Can be a string for user messages or invoice data for AI
}

// Define the component's props
interface MessageHistoryProps {
  messages: Message[];
}

const MessageHistory: React.FC<MessageHistoryProps> = ({ messages }) => {
  return (
    <div className="flex-grow p-6 overflow-y-auto">
      <div className="flex flex-col space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-lg rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.sender === 'user' ? (
                <p>{message.content}</p>
              ) : (
                <InvoiceCard invoiceData={message.content.invoiceData} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageHistory;
