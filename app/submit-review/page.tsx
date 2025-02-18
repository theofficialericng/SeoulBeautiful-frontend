"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

// This would typically come from a database or API
const allClinics = [
  "Seoul Beauty Clinic",
  "Gangnam Plastic Surgery",
  "K-Style Aesthetics",
  "Miracle Plastic Surgery",
  "Dream Plastic Surgery",
]

export default function SubmitReviewPage() {
  const [clinicSearch, setClinicSearch] = useState("")
  const [clinicSuggestions, setClinicSuggestions] = useState<string[]>([])
  const [selectedClinic, setSelectedClinic] = useState("")
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [images, setImages] = useState<File[]>([])
  const router = useRouter()

  const handleClinicSearch = (value: string) => {
    setClinicSearch(value)
    if (value) {
      const suggestions = allClinics.filter((clinic) => clinic.toLowerCase().includes(value.toLowerCase()))
      setClinicSuggestions(suggestions)
    } else {
      setClinicSuggestions([])
    }
  }

  const handleClinicSelect = (clinic: string) => {
    setSelectedClinic(clinic)
    setClinicSearch(clinic)
    setClinicSuggestions([])
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the review data to your backend
    console.log("Submitting review:", { selectedClinic, rating, review, images })
    // After submission, redirect to the reviews page
    router.push("/reviews")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Submit a Review</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="clinic">Clinic Name</Label>
          <div className="relative">
            <Input
              id="clinic"
              type="text"
              placeholder="Search for a clinic"
              value={clinicSearch}
              onChange={(e) => handleClinicSearch(e.target.value)}
            />
            {clinicSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                {clinicSuggestions.map((clinic, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleClinicSelect(clinic)}
                  >
                    {clinic}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                className={`cursor-pointer ${value <= rating ? "text-yellow-500" : "text-gray-300"}`}
                onClick={() => setRating(value)}
              />
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="review">Your Review</Label>
          <Textarea
            id="review"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={5}
          />
        </div>
        <div>
          <Label htmlFor="images">Upload Before & After Images</Label>
          <Input id="images" type="file" multiple onChange={handleImageUpload} />
        </div>
        <Button type="submit" disabled={!selectedClinic || rating === 0 || review.trim() === ""}>
          Submit Review
        </Button>
      </form>
    </div>
  )
}

