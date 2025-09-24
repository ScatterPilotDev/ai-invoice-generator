"use client";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Redirector() {
  const router = useRouter();
  // This is a placeholder for a more robust check of auth status
  // For now, we assume if this component renders, login was successful.
  useEffect(() => {
    router.push('/chat');
  }, [router]);
  return null;
}

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111111]">
      <Authenticator initialState="signUp">
        <Redirector />
      </Authenticator>
    </div>
  );
}
