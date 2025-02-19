// app/inbox/page.tsx
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useWebSocket } from "../hooks/use-websocket"

interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  with: string;
  lastMessage: string;
  unread: boolean;
}

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("")
  const { user } = useAuth()
  const router = useRouter()
  const { sendMessage, ws } = useWebSocket(user?.id);

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return;
    }

    // Fetch conversations
    fetch(`http://localhost:8080/api/chat/conversations/${user.id}`)
      .then(res => res.json())
      .then(data => setConversations(data));
  }, [user, router])

  useEffect(() => {
    if (!ws) return;
  
    ws.onmessage = (event: MessageEvent) => { // Add the MessageEvent type
      const newMessage = JSON.parse(event.data);
      setMessages(prev => [...prev, newMessage]);
      
      // Update conversation list
      setConversations(prev => {
        const updatedConvs = [...prev];
        const convIndex = updatedConvs.findIndex(c => 
          c.id === (newMessage.senderId === user?.id ? newMessage.receiverId : newMessage.senderId)
        );
        
        if (convIndex > -1) {
          updatedConvs[convIndex] = {
            ...updatedConvs[convIndex],
            lastMessage: newMessage.content,
            unread: newMessage.senderId !== user?.id
          };
        }
        return updatedConvs;
      });
    };
  }, [ws, user]);

  useEffect(() => {
    if (selectedConversation && user) {
      // Fetch message history
      fetch(`http://localhost:8080/api/chat/messages/${user.id}/${selectedConversation.id}`)
        .then(res => res.json())
        .then(data => setMessages(data));
    }
  }, [selectedConversation, user]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && selectedConversation && user) {
      const messageData = {
        senderId: user.id,
        receiverId: selectedConversation.id,
        content: message
      };
      
      sendMessage(messageData);
      setMessage("");
    }
  }

  const filteredConversations = conversations.filter((conv) => 
    conv.with.toLowerCase().includes(search.toLowerCase())
  )

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Inbox</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border rounded-lg p-4">
          <Input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          <ScrollArea className="h-[calc(100vh-250px)]">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`flex items-center p-2 cursor-pointer ${
                  selectedConversation?.id === conv.id ? "bg-gray-100" : ""
                }`}
                onClick={() => setSelectedConversation(conv)}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={`/avatars/${conv.id}.jpg`} alt={conv.with} />
                  <AvatarFallback>{conv.with[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{conv.with}</p>
                  <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="md:col-span-2 border rounded-lg p-4">
          {selectedConversation ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Chat with {selectedConversation.with}</h2>
              <ScrollArea className="h-[calc(100vh-350px)] mb-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      msg.senderId === user.id ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-2 rounded-lg ${
                        msg.senderId === user.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">Send</Button>
              </form>
            </>
          ) : (
            <p className="text-center text-gray-500">Select a conversation to start chatting</p>
          )}
        </div>
      </div>
    </div>
  )
}