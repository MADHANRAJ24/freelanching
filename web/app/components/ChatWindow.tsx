'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, Phone, Video } from 'lucide-react';

// Connect to API (assuming localhost:3001)
const socket: Socket = io('http://localhost:3001');

type Message = {
    senderId: number;
    content: string;
    conversationId: number;
};

export default function ChatWindow({ conversationId, userId }: { conversationId: number, userId: number }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [translationEnabled, setTranslationEnabled] = useState(false);

    useEffect(() => {
        socket.emit('joinRoom', `conversation-${conversationId}`);

        socket.on('newMessage', (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, [conversationId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const payload = {
            conversationId,
            senderId: userId,
            content: newMessage,
        };

        socket.emit('sendMessage', payload);
        setNewMessage('');
        // Optimistic UI update could be here
    };

    return (
        <div className="flex flex-col h-[600px] bg-white border rounded-lg shadow-sm">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-[var(--muted)]">
                <h3 className="font-semibold text-[var(--foreground)]">Chat with Client</h3>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-200" title="Audio Call"><Phone className="h-4 w-4 text-[var(--primary)]" /></button>
                    <button className="p-2 rounded-full hover:bg-gray-200" title="Video Call"><Video className="h-4 w-4 text-[var(--primary)]" /></button>
                    <button
                        onClick={() => setTranslationEnabled(!translationEnabled)}
                        className={`text-xs px-2 py-1 rounded border ${translationEnabled ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                    >
                        {translationEnabled ? 'AI Translate ON' : 'Translate OFF'}
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-3 rounded-lg ${msg.senderId === userId ? 'bg-[var(--primary)] text-white' : 'bg-gray-100 text-gray-800'}`}>
                            <p>{msg.content}</p>
                            {translationEnabled && msg.senderId !== userId && (
                                <p className="text-xs mt-1 pt-1 border-t border-gray-300 italic text-gray-600">
                                    Translated: {msg.content} (Mock)
                                </p>
                            )}
                        </div>
                    </div>
                ))}
                {messages.length === 0 && <p className="text-center text-gray-400 text-sm mt-10">No messages yet. Say Namaste! 🙏</p>}
            </div>

            {/* Input */}
            <div className="p-4 border-t flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="p-2 bg-[var(--primary)] text-white rounded-full hover:bg-orange-700">
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
