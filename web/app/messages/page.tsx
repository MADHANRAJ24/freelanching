import ChatWindow from '../components/ChatWindow';
import Navbar from '../components/Navbar';

export default function MessagesPage() {
    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Messages</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1 bg-[var(--card)] rounded-lg border p-4">
                        <h2 className="font-medium mb-4">Conversations</h2>
                        <ul>
                            <li className="p-3 bg-[var(--muted)] rounded cursor-pointer mb-2 font-medium">Rajesh Kumar (Client)</li>
                            <li className="p-3 hover:bg-[var(--muted)] rounded cursor-pointer text-[var(--muted-foreground)]">Priya Designs</li>
                        </ul>
                    </div>
                    <div className="col-span-2">
                        {/* Mock user ID 1 and Conversation 1 */}
                        <ChatWindow conversationId={1} userId={1} />
                    </div>
                </div>
            </div>
        </div>
    );
}
