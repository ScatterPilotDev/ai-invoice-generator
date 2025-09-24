"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react'; // 1. Import the Authenticator

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    },
  },
}, { ssr: true });

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
  // 2. Wrap children with the provider
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
