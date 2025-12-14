'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Briefcase, Code } from 'lucide-react';

type Role = 'CLIENT' | 'FREELANCER';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('FREELANCER');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await res.json();

            if (data.id) {
                // Registration successful, redirect to login
                router.push('/login?registered=true');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 py-10">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="text-3xl font-bold text-[var(--primary)]">DesiGigs</Link>
                    <p className="text-[var(--muted-foreground)] mt-2">Join India's trusted freelancing platform</p>
                </div>

                <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-sm">
                    <form onSubmit={handleSignup} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>
                        )}

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-3">I want to:</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole('FREELANCER')}
                                    className={`flex flex-col items-center p-4 rounded-lg border-2 transition ${role === 'FREELANCER' ? 'border-[var(--primary)] bg-orange-50' : 'border-[var(--border)] hover:border-[var(--primary)]/50'}`}
                                >
                                    <Code className={`h-8 w-8 mb-2 ${role === 'FREELANCER' ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`} />
                                    <span className="font-medium">Work as Freelancer</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('CLIENT')}
                                    className={`flex flex-col items-center p-4 rounded-lg border-2 transition ${role === 'CLIENT' ? 'border-[var(--secondary)] bg-green-50' : 'border-[var(--border)] hover:border-[var(--secondary)]/50'}`}
                                >
                                    <Briefcase className={`h-8 w-8 mb-2 ${role === 'CLIENT' ? 'text-[var(--secondary)]' : 'text-[var(--muted-foreground)]'}`} />
                                    <span className="font-medium">Hire Talent</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Rajesh Kumar"
                                    className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white py-3 rounded-lg font-medium transition disabled:opacity-50 ${role === 'FREELANCER' ? 'bg-[var(--primary)] hover:bg-orange-700' : 'bg-[var(--secondary)] hover:bg-green-700'}`}
                        >
                            {loading ? 'Creating Account...' : `Create ${role === 'FREELANCER' ? 'Freelancer' : 'Client'} Account`}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-sm text-[var(--muted-foreground)]">
                        Already have an account? <Link href="/login" className="text-[var(--primary)] font-medium hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
