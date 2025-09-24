"use client";

import { Amplify } from "aws-amplify";

// This is the standard configuration object for Amplify Gen 6
const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    },
  },
};

Amplify.configure(amplifyConfig, { ssr: true });

export default function ConfigureAmplify() {
  // This component doesn't render anything itself, it just runs the configuration
  return null;
}
