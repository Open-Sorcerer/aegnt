import { useState, useRef } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { SendHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface ChatInterfaceProps {
  messages: { sender: string; content: string }[];
  onSendMessage: (message: string) => void;
}

const ChatInterface = ({ messages, onSendMessage }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const messagesEndRef = useRef(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden border border-neutral-100 flex flex-col h-[200vh] max-h-[800px]">
        <button className="flex justify-center p-4" onClick={() => router.push("/")}>
          <Image src="/aegnt.svg" alt={`Agent`} width={32} height={32} />
        </button>
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "You" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`px-4 py-2 max-w-[70%] ${
                  message.sender === "You"
                    ? "bg-indigo-50 rounded-lg border border-indigo-100"
                    : "bg-neutral-50 rounded-lg border border-neutral-100"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-transparent">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 p-1">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="!h-10"
                isPill
              />
              <Button
                type="submit"
                className="!h-10 rounded-full group !gap-1"
                disabled={!input.trim()}
              >
                Send
                <span className="transition-transform group-hover:translate-x-1">
                  <SendHorizontal />
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
