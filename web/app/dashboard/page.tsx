'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Briefcase, FolderKanban, MessageSquare, Wallet, TrendingUp, FileText, Plus } from 'lucide-react';

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const isClient = user?.role === 'CLIENT';
    const isFreelancer = user?.role === 'FREELANCER';

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[var(--foreground)]">
                        Welcome back, {user?.name || 'User'} 👋
                    </h1>
                    <p className="text-[var(--muted-foreground)]">
                        {isClient ? 'Manage your projects and find talented freelancers' : 'Find great projects and grow your career'}
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <FolderKanban className="h-6 w-6 text-[var(--primary)]" />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--muted-foreground)]">{isClient ? 'Active Projects' : 'Active Bids'}</p>
                                <p className="text-2xl font-bold">3</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Wallet className="h-6 w-6 text-[var(--secondary)]" />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--muted-foreground)]">Wallet Balance</p>
                                <p className="text-2xl font-bold">₹1,250</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <MessageSquare className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--muted-foreground)]">Unread Messages</p>
                                <p className="text-2xl font-bold">5</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--muted-foreground)]">{isClient ? 'Projects Completed' : 'Jobs Done'}</p>
                                <p className="text-2xl font-bold">12</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isClient && (
                        <Link href="/projects/new" className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white hover:from-orange-600 hover:to-orange-700 transition flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-lg">
                                <Plus className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Post New Project</h3>
                                <p className="opacity-80">Find the perfect freelancer for your job</p>
                            </div>
                        </Link>
                    )}
                    {isFreelancer && (
                        <Link href="/projects" className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white hover:from-green-600 hover:to-green-700 transition flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-lg">
                                <Briefcase className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Browse Projects</h3>
                                <p className="opacity-80">Find your next opportunity</p>
                            </div>
                        </Link>
                    )}
                    <Link href="/messages" className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)] transition flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <MessageSquare className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[var(--foreground)]">Messages</h3>
                            <p className="text-[var(--muted-foreground)]">Chat with clients and freelancers</p>
                        </div>
                    </Link>
                </div>

                {/* Recent Activity (Mock) */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Recent Activity</h2>
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl divide-y divide-[var(--border)]">
                        <div className="p-4 flex items-center gap-4">
                            <FileText className="h-5 w-5 text-[var(--muted-foreground)]" />
                            <div>
                                <p className="font-medium">Proposal accepted for "E-commerce Website"</p>
                                <p className="text-sm text-[var(--muted-foreground)]">2 hours ago</p>
                            </div>
                        </div>
                        <div className="p-4 flex items-center gap-4">
                            <MessageSquare className="h-5 w-5 text-[var(--muted-foreground)]" />
                            <div>
                                <p className="font-medium">New message from Priya Designs</p>
                                <p className="text-sm text-[var(--muted-foreground)]">Yesterday</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
