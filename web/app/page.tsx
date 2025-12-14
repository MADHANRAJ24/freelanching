import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-[var(--muted-foreground)] ring-1 ring-[var(--border)] hover:ring-[var(--primary)]/20">
                Made for India's Gig Economy <span className="font-semibold text-[var(--primary)]">🇮🇳</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl">
              Work Freely, <span className="text-[var(--primary)]">Earn Securely</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--muted-foreground)]">
              Connect with top Indian clients and freelancers. Smart matching, real-time translation, and secure UPI payments.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-[var(--primary)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Get Started
              </Link>
              <Link href="/projects" className="text-sm font-semibold leading-6 text-[var(--foreground)] flex items-center gap-1">
                Browse Jobs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-[var(--muted)] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-[var(--primary)]">Why DesiGigs?</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Everything you need to succeed
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-[var(--foreground)]">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]">
                      <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Regional Language Support
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-[var(--muted-foreground)]">
                    Chat in Hindi, Tamil, Telugu, and more with our AI-powered real-time translation tool.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-[var(--foreground)]">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--secondary)]">
                      <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Secure UPI Payments
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-[var(--muted-foreground)]">
                    Get paid directly to your bank account via UPI. Transparent fees and quick settlements.
                  </dd>
                </div>
                {/* More features... */}
              </dl>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[var(--card)] py-12 text-center border-t border-[var(--border)]">
        <p className="text-[var(--muted-foreground)]">&copy; 2025 DesiGigs. Made with ❤️ in India.</p>
      </footer>
    </div>
  );
}
