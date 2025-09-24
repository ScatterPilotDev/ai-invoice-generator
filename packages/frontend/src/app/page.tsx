"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to sign up page, optionally passing the email
    router.push('/auth'); 
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#111111] text-white p-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Transform your coding skills by learning the <span className="text-purple-400">{'>'}fundamentals_</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
  You can&apos;t build anything without a foundation. Learn the core principles of programming with low level languages like C and Assembly.
</p>
        <form onSubmit={handleGetStarted} className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to get started"
            className="flex-grow p-4 bg-[#222222] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors"
          >
            Get My FREE Course
          </button>
        </form>
      </div>
    </main>
  );
}
