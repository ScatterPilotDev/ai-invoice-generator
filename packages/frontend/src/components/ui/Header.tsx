import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 p-6 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          AI Invoice Generator
        </Link>
      </nav>
    </header>
  );
}
