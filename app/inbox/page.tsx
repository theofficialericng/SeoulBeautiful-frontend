// app/inbox/page.tsx
"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"

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

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([{id: 1, senderId: "1", receiverId: "2", content: "Hello", timestamp: "2022-01-01T00:00:00.000Z"}]);
  const [messageString, setMessageString] = useState<string>("");
  const [search, setSearch] = useState("");
  const { user , login, logout } = useAuth();
  const router = useRouter();

  const [selectedReceiver, setSelectedReceiver] = useState({});
  const [filteredReceivers, setFilteredReceivers] = useState([selectedReceiver])

  const stompClientRef = useRef<Client | null>(null);
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
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    // Example: Fetch chat history for a specific receiver (replace with actual logic)
    if (user && selectedReceiver) {
      fetchChatHistory(selectedReceiver.id);
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


  useEffect(() => {
    const socket = new SockJS(wsEndpoint);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected to WebSocket');
        client.subscribe(listenEndpoint + user?.id, (message) => {
          console.log("Received message:", message.body);
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
      debug: (str) => {
        console.log(str);
      },
    });
    client.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional information: ' + frame.headers['exception']);
    };
    
    client.onWebSocketError = (error) => {
      console.log('WebSocket error: ' + error.type);
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [user]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(messageString.trim() && user && selectedReceiver)) {
      return;
    }
    const stompClient = stompClientRef.current;
    if (stompClient && stompClient.connected && selectedReceiver) {
      const newMessage = {senderId: user.id, receiverId: selectedReceiver.id, content: messageString, timestamp: new Date().toISOString()};
      console.log('Sending message:', newMessage);
      stompClient.publish({
        destination: sendMessageEndpoint,
        body: JSON.stringify(newMessage),
      });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageString("");
    } else {
      console.error('Stomp client is not connected');
    }
  }

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
              className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedReceiver?.id === receiver.id ? 'bg-blue-50' : ''
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

        {/* Message Input */}
        {selectedReceiver && (
          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={sendMessage} className="flex">
              <input
                type="text"
                value={messageString}
                onChange={(e) => setMessageString(e.target.value)}
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