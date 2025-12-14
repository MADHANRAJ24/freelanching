'use client';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[var(--card)] border-b border-[var(--border)] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-[var(--primary)]">DesiGigs</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/projects" className="text-[var(--foreground)] hover:text-[var(--primary)] px-3 py-2 rounded-md text-sm font-medium">
                                Find Work
                            </Link>
                            <Link href="/freelancers" className="text-[var(--foreground)] hover:text-[var(--primary)] px-3 py-2 rounded-md text-sm font-medium">
                                Hire Talent
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center space-x-4">
                        <Link href="/login" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] px-3 py-2 rounded-md text-sm font-medium">
                            Log in
                        </Link>
                        <Link href="/signup" className="bg-[var(--primary)] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition">
                            Sign Up
                        </Link>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden bg-[var(--card)] border-b border-[var(--border)]">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="/projects" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)]">
                            Find Work
                        </Link>
                        <Link href="/freelancers" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)]">
                            Hire Talent
                        </Link>
                        <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)]">
                            Log in
                        </Link>
                        <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--primary)] hover:bg-[var(--muted)]">
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
