"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// This would typically come from a database or API
const initialConversations = [
  { id: 1, with: "Jane Doe", lastMessage: "Thanks for your review!", unread: true },
  { id: 2, with: "John Smith", lastMessage: "Could you tell me more about...", unread: false },
  { id: 3, with: "Alice Johnson", lastMessage: "I had a similar experience.", unread: true },
]

export default function InboxPage() {
  const [conversations, setConversations] = useState(initialConversations)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
    // In a real app, you would fetch the user's conversations here
  }, [user, router])

  const filteredConversations = conversations.filter((conv) => conv.with.toLowerCase().includes(search.toLowerCase()))

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && selectedConversation) {
      // In a real app, you would send this message to your backend
      console.log("Sending message:", message, "to conversation:", selectedConversation)
      setMessage("")
      // Update the conversation with the new message
      setConversations(
        conversations.map((conv) =>
          conv.id === selectedConversation.id ? { ...conv, lastMessage: message, unread: false } : conv,
        ),
      )
    }
  }

  if (!user) return null // or a loading spinner

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
                {/* Chat messages would go here */}
                <p className="text-gray-500 text-center">Start of conversation</p>
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

