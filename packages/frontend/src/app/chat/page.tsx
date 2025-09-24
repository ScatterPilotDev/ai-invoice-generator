import { Suspense } from 'react';
import ChatClient from './ChatClient';

// A simple loading component as a fallback
function Loading() {
  return <div>Loading chat...</div>;
}

export default function ChatPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ChatClient />
    </Suspense>
  );
}
