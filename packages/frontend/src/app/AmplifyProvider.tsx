"use client";

import { Amplify } from "aws-amplify";

// IMPORTANT: You must add your AWS region here
const region = "us-east-1"; // e.g., "us-east-1"

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      region,
    },
  },
});

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
