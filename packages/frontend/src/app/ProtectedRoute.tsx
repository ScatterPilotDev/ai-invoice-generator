"use client";

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  if (authStatus === 'configuring') {
    return <div className="flex h-screen w-full items-center justify-center bg-[#111111] text-white">Loading...</div>;
  }

  if (authStatus !== 'authenticated') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111111]">
        <Authenticator initialState="signUp" />
      </div>
    );
  }

  return <>{children}</>;
}
