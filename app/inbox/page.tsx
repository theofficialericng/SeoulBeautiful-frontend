// app/inbox/page.tsx
"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useWebSocket } from "@/hooks/use-websocket"

interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const { sendMessage, ws } = useWebSocket(user?.id);
  const [selectedReceiver, setSelectedReceiver] = useState({});
  const [filteredReceivers, setFilteredReceivers] = useState([])

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Fetch initial chat history for the selected conversation
    const fetchChatHistory = async (receiverId: string) => {
      if (!receiverId) return;
      try {
        const response = await fetch(`http://localhost:8080/api/chat/conversations/${user.id}/${receiverId}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    // Example: Fetch chat history for a specific receiver (replace with actual logic)
    if (user && ws && selectedReceiver) {
      fetchChatHistory(selectedReceiver.id);
    }
  }, [user, ws, router]);

  useEffect(() => {
    const fetchReceivers = async () => {
        const response = await fetch(`https://localhost:8080/api/chat/conversations/${user.id}`);
        const data = await response.json();
        if (response.ok) {
          setFilteredReceivers(data);
        } else {
          console.error('Error fetching receivers:', data);
        }
    };
    
    fetchReceivers();
  }, [user]);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event: MessageEvent) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
  }, [ws]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && user) {
      const messageData = {
        senderId: user.id,
        receiverId: selectedReceiver.id,
        content: message
      };

      sendMessage(messageData);
      setMessage("");
    }
  };

return (
    <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold">Chats</h1>
                <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="overflow-y-auto">
                {filteredReceivers.map((receiver) => (
                    <div
                        key={receiver.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${
                            selectedReceiver?.id === receiver.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedReceiver(receiver)}
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <div className="ml-3">
                                <p className="font-medium">{receiver.username}</p>
                                <p className="text-sm text-gray-500">{messages.at(0)?.content ?? ""}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Chat Window */}
        <div className="flex flex-col flex-1">
            {/* Chat Header */}
            {selectedReceiver && (
                <div className="p-4 bg-white border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div className="ml-3">
                            <p className="font-medium">{selectedReceiver.username}</p>
                            <p className="text-sm text-gray-500">Online</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex mb-4 ${
                            msg.senderId === user?.id ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`max-w-xs p-3 rounded-lg ${
                                msg.senderId === user?.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                        >
                            <p>{msg.content}</p>
                            <p className="text-xs mt-1 text-gray-400">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            {selectedReceiver && (
                <div className="p-4 bg-white border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    </div>
);
}