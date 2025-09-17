// Import necessary hooks from React
import React, { useState } from 'react';

// Define the component's props using TypeScript for type safety
interface ChatInputProps {
  onSubmit: (message: string) => void; // A function to call when the form is submitted
  isLoading: boolean;                  // A boolean to know if the API call is in progress
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading }) => {
  // State to hold the current value of the input field
  const [inputValue, setInputValue] = useState('');

  // Function to handle the form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default browser form submission
    if (!inputValue.trim() || isLoading) return; // Don't submit if input is empty or loading
    onSubmit(inputValue); // Call the passed-in onSubmit function with the message
    setInputValue(''); // Clear the input field after submitting
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100">
      <div className="flex items-center bg-white rounded-lg border border-gray-300 p-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter an invoice request..."
          className="flex-grow p-2 bg-transparent focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
