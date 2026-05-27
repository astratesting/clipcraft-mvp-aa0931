import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Clapperboard } from 'lucide-react';

export function Navbar() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
      <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-white">
        <span className="rounded-2xl bg-white/10 p-2 text-electric ring-1 ring-white/10">
          <Clapperboard size={22} />
        </span>
        ClipCraft
      </Link>
      <nav className="flex items-center gap-3 text-sm">
        <SignedOut>
          <Link href="/sign-in" className="text-slate-300 hover:text-white">
            Sign in
          </Link>
          <Link href="/sign-up" className="rounded-full bg-white px-4 py-2 font-medium text-ink hover:bg-slate-200">
            Start editing
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard" className="text-slate-300 hover:text-white">
            Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
}
