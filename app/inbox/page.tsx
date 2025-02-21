// app/inbox/page.tsx
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import assert from "assert"
import { initialMessages, authors } from '@/app/data';

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

function Sidebar({ receivers, selectedReceiver, setSelectedReceiver }) {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filteredReceivers, setFilteredReceivers] = useState(receivers);

  useEffect(() => {
    setFilteredReceivers(
      receivers.filter((receiver) =>
        receiver.username.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [receivers, search]);

  return (
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
            className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedReceiver?.id === receiver.id ? 'bg-blue-50' : ''
              }`}
            onClick={() => setSelectedReceiver(receiver)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="ml-3">
                <p className="font-medium">{receiver.username}</p>
                <p className="text-sm text-gray-500">"Last message"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatHeader({ selectedReceiver }) {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="ml-3">
          <p className="font-medium">{selectedReceiver?.username}</p>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>
    </div>
  );
}

function MessageList({ messages, userId }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg) => (
        <div
          key={msg.timestamp}
          className={`flex mb-4 ${msg.senderId == userId ? 'justify-end' : 'justify-start'
            }`}
        >
          <div
            className={`max-w-xs p-3 rounded-lg ${msg.senderId == userId
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
  );
}

function MessageInput({ sendMessage }) {
  const [message, setMessage] = useState("");

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim() === "") return;
    sendMessage(message);
    setMessage("");
  }

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSend} className="flex">
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
  );
}

function getReceiverFromQueryParams() {
  // Search query params for authorId and parse it to a number, then set it to receiverId
  // This is set when referred by review page
  const params = useSearchParams();
  const id = params.get("authorId") ? parseInt(params.get("authorId")) : null;
  return authors.find((author) => author.id === id);
}

function fetchConversation(receiverId: number): Message[] {
  return JSON.parse(localStorage.getItem(`conversation-${receiverId}`) || "[]");
}

function saveConversation(receiverId: number, messages: Message[]): void {
  localStorage.setItem(`conversation-${receiverId}`, JSON.stringify(messages));
}

export default function InboxPage() {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  if (!user) {
    console.error("You must be logged in to view this page");
    router.push("/login");
    return;
  }

  const [selectedReceiver, setSelectedReceiver] = useState(getReceiverFromQueryParams());
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    if (!selectedReceiver) return;
    const conversation = fetchConversation(selectedReceiver.id);
    setMessages(conversation);
  }, [selectedReceiver])
  
  const sendMessage = (messageString: string) => {
    assert(selectedReceiver, "Selected receiver is undefined");
    const newMessage: Message = { id: messages.length, senderId: user.id, receiverId: selectedReceiver.id, content: messageString, timestamp: new Date().toISOString() };
    console.log('Sending message:', newMessage);
    const conversation = [...messages, newMessage];
    saveConversation(selectedReceiver.id, conversation);
    setMessages(conversation);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar  receivers={authors} selectedReceiver={selectedReceiver} setSelectedReceiver={setSelectedReceiver} />
      <div className="flex flex-col flex-1">
      {selectedReceiver && <ChatHeader selectedReceiver={selectedReceiver} /> }
      <MessageList messages={messages} userId={user.id} />
      {selectedReceiver && <MessageInput sendMessage={sendMessage} /> }
      </div>
    </div>
  )
}
