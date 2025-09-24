import React from 'react';
import InvoiceCard from './InvoiceCard'; // We will create this component next

// Define the shape of a single message object
// Define the shape of the invoice data object
interface InvoiceData {
  clientName: string;
  invoiceDate: string;
  lineItems: { description: string; quantity: number; unitPrice: number }[];
  totalAmount: number;
}

export interface Message {
  sender: 'user' | 'ai';
  content: string | { invoiceData: InvoiceData }; // Use a specific union type
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
              {message.sender === 'user' && typeof message.content === 'string' ? (
  <p>{message.content}</p>
) : (
  message.sender === 'ai' && typeof message.content === 'object' &&
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
