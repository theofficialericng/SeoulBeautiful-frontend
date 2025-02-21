"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Edit, Trash2, Check, MessageCircle } from "lucide-react"
import ReviewForm from "./ReviewForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/router"
import { useAuth } from "../contexts/AuthContext"

export default function ReviewItem({ review, onEdit, onDelete, onOpenChat }) {
  const [isEditing, setIsEditing] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [imageDimensions, setImageDimensions] = useState({})
  const { user, login, logout } = useAuth()

  const handleEdit = (updatedReview) => {
    onEdit(review.id, updatedReview)
    setIsEditing(false)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Message sent to author:", message)
    setMessage("")
    setChatOpen(false)
  }

  // Function to handle image load and capture dimensions
  const handleImageLoad = (imageUrl, event) => {
    const img = event.target
    const { naturalWidth, naturalHeight } = img
    
    setImageDimensions(prev => ({
      ...prev,
      [imageUrl]: {
        width: naturalWidth,
        height: naturalHeight,
        aspect: naturalWidth / naturalHeight
      }
    }))
  }

  // Calculate optimal display dimensions
  const getDisplayDimensions = (imageUrl) => {
    const dimensions = imageDimensions[imageUrl]
    if (!dimensions) return { width: 96, height: 96 } // Default size (24 * 4)

    const maxWidth = 400 // Maximum width for images
    const maxHeight = 400 // Maximum height for images
    const minWidth = 96 // Minimum width
    const minHeight = 96 // Minimum height

    let width = dimensions.width
    let height = dimensions.height

    // Scale down if larger than maximum dimensions
    if (width > maxWidth) {
      width = maxWidth
      height = width / dimensions.aspect
    }
    if (height > maxHeight) {
      height = maxHeight
      width = height * dimensions.aspect
    }

    // Scale up if smaller than minimum dimensions
    if (width < minWidth) {
      width = minWidth
      height = width / dimensions.aspect
    }
    if (height < minHeight) {
      height = minHeight
      width = height * dimensions.aspect
    }

    return {
      width: Math.round(width),
      height: Math.round(height)
    }
  }

  if (isEditing) {
    return <ReviewForm onSubmit={handleEdit} initialReview={review} />
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <Link href={`/clinics/${review.clinic.id}`} className="text-blue-600 hover:underline">
          {review.clinic.name}
        </Link>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star key={value} className={`${value <= review.rating ? "text-yellow-500" : "text-gray-300"}`} />
          ))}
        </div>
      </div>
      <p className="mb-2">{review.comment}</p>
      
      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
        {review.images.map((imageUrl, index) => (
          <div key={index} className="relative">
            {/* Hidden image to get natural dimensions */}
            <img
              src={imageUrl || "/placeholder.svg"}
              onLoad={(e) => handleImageLoad(imageUrl, e)}
              className="hidden"
              alt=""
            />
            
            {/* Visible image with dynamic dimensions */}
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={`Review ${index + 1}`}
                width={getDisplayDimensions(imageUrl).width}
                height={getDisplayDimensions(imageUrl).height}
                className="object-cover rounded-lg"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          - {review.author.username}
          {review.author.isVerified && (
            <span className="ml-2 text-green-500">
              <Check size={16} className="inline" /> Verified Patient
            </span>
          )}
        </p>
        
        <div className="space-x-2">
          {review.author.id !== user?.id && (
            <>
              <Dialog open={chatOpen} onOpenChange={onOpenChat}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with Author
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Chat with {review.author.username}</DialogTitle>
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
            </>
          )}
          {review.author.id === user?.id && (
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

