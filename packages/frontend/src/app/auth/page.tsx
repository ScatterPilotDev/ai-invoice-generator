"use client";

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'; // 1. Import useEffect

export default function AuthPage() {
  const router = useRouter();

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
        {({ user }) => { // 2. Removed unused 'signOut' variable
          
          // 3. Use an effect to handle the redirect after login
          useEffect(() => {
            if (user) {
              router.push('/chat');
            }
          }, [user, router]);

          return null; // This component just handles the redirect
        }}
      </Authenticator>
    </div>
  );
}
