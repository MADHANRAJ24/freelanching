'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function NewProjectPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState<number>(5000);
    const [budgetType, setBudgetType] = useState<'FIXED' | 'HOURLY'>('FIXED');
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const removeSkill = (skill: string) => {
        setSkills(skills.filter((s) => s !== skill));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3001/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description, budget, budgetType, skillsRequired: skills }),
            });

            if (res.ok) {
                router.push('/dashboard');
            } else {
                alert('Failed to post project');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Post a New Project</h1>

                <form onSubmit={handleSubmit} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Project Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="E.g., Build an E-commerce Website"
                            className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={5}
                            placeholder="Describe your project in detail..."
                            className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Budget (₹)</label>
                            <input
                                type="number"
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value))}
                                min={100}
                                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Budget Type</label>
                            <select
                                value={budgetType}
                                onChange={(e) => setBudgetType(e.target.value as 'FIXED' | 'HOURLY')}
                                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            >
                                <option value="FIXED">Fixed Price</option>
                                <option value="HOURLY">Hourly Rate</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Required Skills</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                placeholder="E.g., React, Node.js"
                                className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                            />
                            <button type="button" onClick={addSkill} className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span key={skill} className="bg-[var(--muted)] px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    {skill}
                                    <button type="button" onClick={() => removeSkill(skill)} className="text-red-500 hover:text-red-700">×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Posting...' : 'Post Project'}
                    </button>
                </form>
            </div>
        </div>
    );
}
