"use client";

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// 1. Create a new component to handle the redirect logic
function Redirector() {
  const router = useRouter();
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    // This hook will run when the user object changes
    if (user) {
      router.push('/chat');
    }
  }, [user, router]);

  // This component doesn't render anything itself
  return null;
}

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111111]">
      <Authenticator initialState="signUp" components={{
        Header() {
          return (
            <div className="text-center p-4">
              <h1 className="text-2xl font-bold text-white">AI Invoice Generator</h1>
            </div>
          );
        },
      }}>
        {/* 2. Render the new component, which handles its own logic */}
        <Redirector />
      </Authenticator>
    </div>
  );
}
