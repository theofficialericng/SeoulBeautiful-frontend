"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Star, MapPin } from "lucide-react"
import { clinics } from '@/app/data';

export default function ClinicPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth()
  const clinic = clinics.find((c) => c.id === Number(id))
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [inquiry, setInquiry] = useState("")

  if (!clinic) {
    notFound()
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this inquiry to your backend
    console.log("Inquiry submitted:", inquiry)
    setInquiry("")
    setInquiryOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={clinic.image || "/placeholder.svg"}
            alt={clinic.name}
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{clinic.name}</h1>
          <p className="text-gray-600 mb-6">{clinic.description}</p>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= Math.round(clinic.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {clinic.rating.toFixed(1)} - Based on {clinic.reviewCount} reviews
            </span>
          </div>
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-600">{clinic.location}</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mb-4">
                View on Map
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{clinic.name} Location</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <iframe
                  width="100%"
                  height="300"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(clinic.name + " " + clinic.location)}`}
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
          <h2 className="text-2xl font-semibold mb-4">Our Surgeons</h2>
          <ul className="space-y-2 mb-6">
            {clinic.surgeons.map((surgeon) => (
              <li key={surgeon.id}>
                <Link href={`/surgeons/${surgeon.id}`} className="text-blue-600 hover:underline">
                  {surgeon.name} - {surgeon.specialty}
                </Link>
              </li>
            ))}
          </ul>
          {user ? (
            <Dialog open={inquiryOpen} onOpenChange={setInquiryOpen}>
              <DialogTrigger asChild>
                <Button>Inquiry</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send an Inquiry to {clinic.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <Textarea
                    placeholder="Type your inquiry here..."
                    value={inquiry}
                    onChange={(e) => setInquiry(e.target.value)}
                    rows={5}
                  />
                  <Button type="submit">Send Inquiry</Button>
                </form>
              </DialogContent>
            </Dialog>
          ) : (
            <Link href="/login" className="text-blue-600 hover:underline">
              Login to Send an Inquiry
            </Link>
          )}
          <div className="mt-4">
            <Link
              href={clinic.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Clinic Website
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Patient Reviews</h2>
        <div className="space-y-4">
          {clinic.reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">{review.author}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

