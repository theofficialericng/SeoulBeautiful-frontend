"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import ReviewItem from "../components/ReviewItem"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

// This would typically come from a database or API
const initialReviews = [
  {
    id: 1,
    clinicId: 1,
    clinicName: "Seoul Beauty Clinic",
    author: "Jane D.",
    rating: 5,
    comment: "Excellent results and care!",
    isVerified: true,
    images: ["/images/before-after-1.jpg"],
    procedure: "Rhinoplasty",
  },
  {
    id: 2,
    clinicId: 1,
    clinicName: "Seoul Beauty Clinic",
    author: "John S.",
    rating: 4,
    comment: "Very professional staff.",
    isVerified: true,
    images: [],
    procedure: "Double Eyelid Surgery",
  },
  {
    id: 3,
    clinicId: 2,
    clinicName: "Gangnam Plastic Surgery",
    author: "Alice K.",
    rating: 5,
    comment: "Amazing experience from start to finish.",
    isVerified: false,
    images: ["/images/before-after-2.jpg", "/images/before-after-3.jpg"],
    procedure: "Rhinoplasty",
  },
]

// This would typically come from a database or API
const allClinics = [
  "Seoul Beauty Clinic",
  "Gangnam Plastic Surgery",
  "K-Style Aesthetics",
  "Miracle Plastic Surgery",
  "Dream Plastic Surgery",
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews)
  const { user } = useAuth()
  const [procedureFilter, setProcedureFilter] = useState("")
  const [clinicSearch, setClinicSearch] = useState("")
  const [clinicSuggestions, setClinicSuggestions] = useState<string[]>([])
  const [showOnlyWithImages, setShowOnlyWithImages] = useState(false)
  const [submitReviewOpen, setSubmitReviewOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (clinicSearch) {
      const suggestions = allClinics.filter((clinic) => clinic.toLowerCase().includes(clinicSearch.toLowerCase()))
      setClinicSuggestions(suggestions)
    } else {
      setClinicSuggestions([])
    }
  }, [clinicSearch])

  const filteredReviews = reviews.filter((review) => {
    return (
      (!procedureFilter || review.procedure === procedureFilter) &&
      (!clinicSearch || review.clinicName.toLowerCase().includes(clinicSearch.toLowerCase())) &&
      (!showOnlyWithImages || review.images.length > 0)
    )
  })

  const procedures = [...new Set(reviews.map((review) => review.procedure))]

  const handleSubmitReview = () => {
    if (user) {
      router.push("/submit-review")
    } else {
      setSubmitReviewOpen(true)
    }
  }

  const handleLogin = () => {
    // In a real app, this would redirect to the login page
    console.log("Redirecting to login page")
    setSubmitReviewOpen(false)
  }

  const addReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews])
    toast({
      title: "Review Submitted",
      description: "Your review has been successfully submitted.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Customer Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Select onValueChange={setProcedureFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Procedure" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Procedures</SelectItem>
            {procedures.map((procedure) => (
              <SelectItem key={procedure} value={procedure}>
                {procedure}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by Clinic"
            value={clinicSearch}
            onChange={(e) => setClinicSearch(e.target.value)}
          />
          {clinicSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
              {clinicSuggestions.map((clinic, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setClinicSearch(clinic)
                    setClinicSuggestions([])
                  }}
                >
                  {clinic}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="showWithImages" checked={showOnlyWithImages} onCheckedChange={setShowOnlyWithImages} />
          <Label htmlFor="showWithImages">Show only reviews with images</Label>
        </div>
      </div>
      <div className="space-y-6 mt-8">
        {filteredReviews.map((review) => (
          <ReviewItem key={review.id} review={review} isOwner={user && user.username === review.author} />
        ))}
      </div>
      <div className="mt-8">
        <Button onClick={handleSubmitReview}>Submit a Review</Button>
        <Dialog open={submitReviewOpen} onOpenChange={setSubmitReviewOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login Required</DialogTitle>
            </DialogHeader>
            <p className="mb-4">You need to be logged in to submit a review.</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSubmitReviewOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleLogin}>Login</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

