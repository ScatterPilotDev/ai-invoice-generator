import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 p-6 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          AI Invoice Generator
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/auth" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/auth" className="px-5 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
