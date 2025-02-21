// app/inbox/page.tsx
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import assert from "assert"

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

const wsEndpoint = "https://localhost:8080/api/ws"
const sendMessageEndpoint = "/app/chat.sendMessage"
const listenEndpoint = "/user/"

function Sidebar({ search, setSearch, filteredReceivers, selectedReceiver, setSelectedReceiver }) {
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
                <p className="text-sm text-gray-500">{messages.length === 0 ? "" : messages[messages.length - 1].content}</p>
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

function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex mb-4 ${msg.senderId == user?.id ? 'justify-end' : 'justify-start'
            }`}
        >
          <div
            className={`max-w-xs p-3 rounded-lg ${msg.senderId == user?.id
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

function getReceiverIdFromQueryParams() {
  // Search query params for authorId and parse it to a number, then set it to receiverId
  // This is set when referred by review page
  const params = useSearchParams();
  return params.get("authorId") ? parseInt(params.get("authorId")) : null;
}

export default function InboxPage() {
  const { user, login, logout } = useAuth();
  if (!user) {
    console.error("You must be logged in to view this page");
    return;
  }

  const receiverId = getReceiverIdFromQueryParams();

  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ id: 1, senderId: user?.id, receiverId: receiverId, content: "Hello", timestamp: new Date().toISOString() }]);
  const router = useRouter();

  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [filteredReceivers, setFilteredReceivers] = useState([])

  if (receiverId) {
    useEffect(() => {
      fetch(`https://localhost:8080/api/users/${receiverId}`)
        .then(response => response.json())
        .then(data => setSelectedReceiver(data))
      console.log("Receiver ID:", receiverId);
    }, [receiverId])
  }

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Fetch initial chat history for the selected conversation
    const fetchChatHistory = async (receiverId: string) => {
      if (!receiverId) return;
      try {
        const response = await fetch(`https://localhost:8080/api/chat/conversations/${user.id}/${receiverId}`);
        return await response.json();
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    if (user && selectedReceiver && messages.length === 1) {
      console.log(selectedReceiver);
      fetchChatHistory(selectedReceiver.id).then(data => {
        setMessages(data);
      });
    }
  }, [user, router]);

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

  const sendMessage = (messageString: string) => {
    assert(selectedReceiver, "Selected receiver is undefined");
    const newMessage: Message = { senderId: user.id, receiverId: selectedReceiver.id, content: messageString, timestamp: new Date().toISOString() };
    console.log('Sending message:', newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  return (
    <div>
      <Sidebar search={search} setSearch={setSearch} filteredReceivers={filteredReceivers} selectedReceiver={selectedReceiver} setSelectedReceiver={setSelectedReceiver} />
      <ChatHeader selectedReceiver={selectedReceiver} />
      <MessageList messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}