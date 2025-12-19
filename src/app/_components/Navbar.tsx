import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 py-4 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/pokeball.svg"
            alt="Pokemon Logo"
            width={32}
            height={32}
            className="hover:opacity-80 transition-opacity"
          />
          <span className="text-xl font-bold text-gray-900">Omar's Pokedex</span>
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 underline text-lg font-medium">
            Home
          </Link>
          <Link href="/search" className="text-blue-600 hover:text-blue-800 underline text-lg font-medium">
            Search
          </Link>
        </div>
      </div>
    </nav>
  );
}
