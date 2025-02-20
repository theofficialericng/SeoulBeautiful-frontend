"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// This would typically come from an API call
const getUserConsultations = (userId) => [
  { id: 1, doctorId: 1, doctorName: "Dr. Kim", clinicId: 1, clinicName: "Seoul Beauty Clinic", date: "2023-05-15" },
  { id: 2, doctorId: 2, doctorName: "Dr. Lee", clinicId: 2, clinicName: "Gangnam Plastic Surgery", date: "2023-06-01" },
]

export default function ReviewForm({ onSubmit, initialReview = null }) {
  const [rating, setRating] = useState(initialReview ? initialReview.rating : 0)
  const [comment, setComment] = useState(initialReview ? initialReview.comment : "")
  const [images, setImages] = useState(initialReview ? initialReview.images : [])
  const { user, login, logout } = useAuth()

  const initialConsultation = getUserConsultations(user?.id)[0] ?? { id: 0, doctorId: 0, doctorName: "", clinicId: 0, clinicName: "No consultation selected", date: "" };
  const formatConsultationLabel = (consultation) => `${consultation.doctorName} - ${consultation.clinicName} - ${consultation.date}`;
  const [selectedConsultation, setSelectedConsultation] = useState(formatConsultationLabel(initialConsultation));
  const [consultations, setConsultations] = useState([])

  useEffect(() => {
    if (user) {
      const userConsultations = getUserConsultations(user.id)
      setConsultations(userConsultations)
    }
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedConsultationData = consultations.find((c) => c.id === Number(selectedConsultation))
    onSubmit({
      rating,
      comment,
      images,
      authorId: user?.id,
      doctorId: selectedConsultationData.doctorId,
      doctorName: selectedConsultationData.doctorName,
      clinicId: selectedConsultationData.clinicId,
      clinicName: selectedConsultationData.clinicName,
    })
    if (!initialReview) {
      setRating(0)
      setComment("")
      setImages([])
      setSelectedConsultation("")
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setImages([...images, ...imageUrls])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Select Consultation</label>
        <Select onValueChange={setSelectedConsultation} value={selectedConsultation}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a consultation" />
          </SelectTrigger>
          <SelectContent>
            {consultations.map((consultation) => (
              <SelectItem key={consultation.id} value={consultation.id.toString()}>
                {formatConsultationLabel(consultation)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block mb-2">Rating</label>
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
        <label htmlFor="comment" className="block mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="images" className="block mb-2">
          Upload Images
        </label>
        <input type="file" id="images" accept="image/*" multiple onChange={handleImageUpload} className="w-full" />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Uploaded ${index + 1}`}
            className="w-24 h-24 object-cover"
          />
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={!selectedConsultation}
      >
        {initialReview ? "Update Review" : "Submit Review"}
      </button>
    </form>
  )
}

