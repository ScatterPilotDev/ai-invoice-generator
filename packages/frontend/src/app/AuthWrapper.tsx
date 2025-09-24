"use client";

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// No longer need useEffect

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuthenticator(context => [context.authStatus]); // Remove user

  // ... rest of the component is the same
}
