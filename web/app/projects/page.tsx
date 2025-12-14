'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Briefcase, IndianRupee, Clock, Filter } from 'lucide-react';

type Project = {
    id: number;
    title: string;
    description: string;
    budget: number;
    budgetType: string;
    skillsRequired: string[];
    client: { name: string };
    createdAt: string;
};

export default function ProjectsListPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/projects')
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-[var(--foreground)]">Browse Projects</h1>
                    <button className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-lg hover:border-[var(--primary)]">
                        <Filter className="h-4 w-4" /> Filters
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-[var(--muted-foreground)]">Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20 text-[var(--muted-foreground)]">No projects found. Check back later!</div>
                ) : (
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <Link href={`/projects/${project.id}`} key={project.id} className="block bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)] transition">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-lg font-semibold text-[var(--foreground)]">{project.title}</h2>
                                        <p className="text-[var(--muted-foreground)] mt-1 line-clamp-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {project.skillsRequired.map((skill) => (
                                                <span key={skill} className="bg-[var(--muted)] text-sm px-2 py-1 rounded">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="flex items-center gap-1 text-lg font-bold text-[var(--primary)]">
                                            <IndianRupee className="h-4 w-4" />{project.budget.toLocaleString('en-IN')}
                                        </p>
                                        <p className="text-sm text-[var(--muted-foreground)]">{project.budgetType}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-sm text-[var(--muted-foreground)]">
                                    <span>By {project.client?.name || 'Anonymous Client'}</span>
                                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {new Date(project.createdAt).toLocaleDateString()}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
