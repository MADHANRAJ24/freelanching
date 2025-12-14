'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { CreditCard, Wallet, IndianRupee, History } from 'lucide-react';

// Load Razorpay script dynamically
const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export default function WalletPage() {
    const [amount, setAmount] = useState<number>(500);
    const [loading, setLoading] = useState(false);
    const [walletBalance, setWalletBalance] = useState(1250); // Mock

    const handleAddFunds = async () => {
        setLoading(true);
        const res = await loadRazorpayScript();
        if (!res) {
            alert('Razorpay SDK failed to load');
            setLoading(false);
            return;
        }

        // Call backend to create order
        try {
            const response = await fetch('http://localhost:3001/payments/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // Add auth token here
                },
                body: JSON.stringify({ amount, description: 'Wallet Top-up' }),
            });
            const data = await response.json();

            const options = {
                key: data.key,
                amount: data.amount * 100,
                currency: data.currency,
                name: 'DesiGigs',
                description: 'Add Funds to Wallet',
                order_id: data.orderId,
                handler: async function (response: any) {
                    // Verify payment
                    const verifyRes = await fetch('http://localhost:3001/payments/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(response),
                    });
                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert('Payment Successful! Wallet updated.');
                        setWalletBalance((prev) => prev + amount);
                    } else {
                        alert('Payment verification failed.');
                    }
                },
                prefill: {
                    name: 'Test User',
                    email: 'test@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#ea580c', // Primary Saffron
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment Error:', error);
            alert('Failed to initiate payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-2xl font-bold mb-8 text-[var(--foreground)] flex items-center gap-2">
                    <Wallet className="h-6 w-6 text-[var(--primary)]" /> My Wallet
                </h1>

                {/* Balance Card */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white mb-8 shadow-lg">
                    <p className="text-sm opacity-80">Current Balance</p>
                    <h2 className="text-4xl font-bold flex items-center gap-1 mt-1">
                        <IndianRupee className="h-8 w-8" /> {walletBalance.toLocaleString('en-IN')}
                    </h2>
                </div>

                {/* Add Funds */}
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-[var(--secondary)]" /> Add Funds
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                        {[100, 500, 1000, 2000].map((val) => (
                            <button
                                key={val}
                                onClick={() => setAmount(val)}
                                className={`px-4 py-2 rounded-lg border ${amount === val ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--border)] hover:border-[var(--primary)]'}`}
                            >
                                ₹{val}
                            </button>
                        ))}
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="px-4 py-2 border border-[var(--border)] rounded-lg w-24 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            placeholder="Other"
                        />
                    </div>
                    <button
                        onClick={handleAddFunds}
                        disabled={loading || amount < 1}
                        className="w-full bg-[var(--secondary)] text-white py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : `Add ₹${amount.toLocaleString('en-IN')} via Razorpay`}
                    </button>
                </div>

                {/* Transaction History (Mock) */}
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <History className="h-5 w-5 text-[var(--accent)]" /> Recent Transactions
                    </h3>
                    <ul className="divide-y divide-[var(--border)]">
                        <li className="py-3 flex justify-between items-center">
                            <div>
                                <p className="font-medium">Wallet Top-up</p>
                                <p className="text-sm text-[var(--muted-foreground)]">Dec 14, 2024</p>
                            </div>
                            <span className="text-green-600 font-medium">+ ₹500</span>
                        </li>
                        <li className="py-3 flex justify-between items-center">
                            <div>
                                <p className="font-medium">Project Payment to Freelancer</p>
                                <p className="text-sm text-[var(--muted-foreground)]">Dec 12, 2024</p>
                            </div>
                            <span className="text-red-600 font-medium">- ₹1,200</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
