"use client";

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// This component will wrap your entire application
export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  // While Amplify is checking the auth status, show a loading screen
  if (authStatus === 'configuring') {
    return <div className="flex h-screen w-full items-center justify-center bg-[#111111] text-white">Loading...</div>;
  }

  // If the user is not authenticated, show the login form
  if (authStatus !== 'authenticated') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111111]">
        <Authenticator initialState="signUp" />
      </div>
    );
  }
      
  // If the user is authenticated, show the application
  return <>{children}</>;
}
