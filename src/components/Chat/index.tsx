'use client'

import { useState } from 'react'
import ChatInterface from './ChatInterface';

interface Message {
    sender: string;
    content: string;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([])

    const handleSendMessage = async (message: string) => {
        setMessages(prev => [...prev, { sender: 'You', content: message }]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessages(prev => [...prev, { sender: 'AI', content: data.response }]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { sender: 'AI', content: 'An error occurred. Please try again.' }]);
        }
    }

    return (
        <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
        />
    );
}