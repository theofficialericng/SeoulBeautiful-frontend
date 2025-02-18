"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Star, Edit, Trash2, Check, MessageCircle } from "lucide-react"
import ReviewForm from "./ReviewForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function ReviewItem({ review, onEdit, onDelete, isOwner }) {
  const [isEditing, setIsEditing] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleEdit = (updatedReview) => {
    onEdit(review.id, updatedReview)
    setIsEditing(false)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this message to your backend
    console.log("Message sent to author:", message)
    setMessage("")
    setChatOpen(false)
  }

  if (isEditing) {
    return <ReviewForm onSubmit={handleEdit} initialReview={review} />
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <Link href={`/clinics/${review.clinicId}`} className="text-blue-600 hover:underline">
          {review.clinicName}
        </Link>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star key={value} className={`${value <= review.rating ? "text-yellow-500" : "text-gray-300"}`} />
          ))}
        </div>
      </div>
      <p className="mb-2">{review.comment}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {review.images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Review ${index + 1}`}
            className="w-24 h-24 object-cover"
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          - {review.author}
          {review.isVerified && (
            <span className="ml-2 text-green-500">
              <Check size={16} className="inline" /> Verified Patient
            </span>
          )}
        </p>
        <div className="space-x-2">
          <Dialog open={chatOpen} onOpenChange={setChatOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with Author
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Chat with {review.author}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleChatSubmit} className="space-y-4">
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                />
                <Button type="submit">Send Message</Button>
              </form>
            </DialogContent>
          </Dialog>
          {isOwner && (
            <>
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit size={16} />
              </Button>
              <Button onClick={() => onDelete(review.id)} variant="outline" size="sm">
                <Trash2 size={16} />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

