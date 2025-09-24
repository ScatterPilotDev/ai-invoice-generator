"use client";

import Link from 'next/link';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Header() {
  const { authStatus, signOut } = useAuthenticator(context => [context.authStatus]);

  return (
    <header className="absolute top-0 left-0 right-0 p-6 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          AI Invoice Generator
        </Link>

        {/* Only show the Sign Out button if the user is authenticated */}
        {authStatus === 'authenticated' && (
          <button 
            onClick={signOut} 
            className="px-5 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors"
          >
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
}
