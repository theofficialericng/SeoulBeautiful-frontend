"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, MapPin, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// This would typically come from a database or API
const clinics = [
  {
    id: 1,
    name: "Seoul Beauty Clinic",
    image: "/images/clinic1.jpg",
    rating: 4.5,
    reviewCount: 120,
    location: "Gangnam, Seoul",
    procedures: ["Rhinoplasty", "Double Eyelid Surgery", "Facial Contouring"],
    mapUrl: "https://goo.gl/maps/exampleSeoulBeautyClinic",
  },
  {
    id: 2,
    name: "Gangnam Plastic Surgery",
    image: "/images/clinic2.jpg",
    rating: 4.8,
    reviewCount: 250,
    location: "Apgujeong, Seoul",
    procedures: ["Breast Augmentation", "Liposuction", "Rhinoplasty"],
    mapUrl: "https://goo.gl/maps/exampleGangnamPlasticSurgery",
  },
  {
    id: 3,
    name: "K-Style Aesthetics",
    image: "/images/clinic3.jpg",
    rating: 4.2,
    reviewCount: 80,
    location: "Busan",
    procedures: ["Facial Contouring", "Body Contouring", "Skin Treatments"],
    mapUrl: "https://goo.gl/maps/exampleKStyleAesthetics",
  },
  // Add more clinics as needed
]

export default function ClinicsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [filteredClinics, setFilteredClinics] = useState(clinics)

  useEffect(() => {
    const results = clinics.filter(
      (clinic) =>
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.procedures.some((procedure) => procedure.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredClinics(results)

    const allSuggestions = [
      ...new Set([...clinics.map((clinic) => clinic.name), ...clinics.flatMap((clinic) => clinic.procedures)]),
    ]
    const filteredSuggestions = allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setSuggestions(filteredSuggestions.slice(0, 5))
  }, [searchTerm])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Clinics</h1>
      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Search clinics or procedures..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {suggestions.length > 0 && searchTerm && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchTerm(suggestion)
                  setSuggestions([])
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClinics.map((clinic) => (
          <div key={clinic.id} className="border rounded-lg overflow-hidden shadow-lg">
            <Image
              src={clinic.image || "/placeholder.svg"}
              alt={clinic.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <Link href={`/clinics/${clinic.id}`} className="text-xl font-semibold hover:underline">
                {clinic.name}
              </Link>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= Math.round(clinic.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">Based on {clinic.reviewCount} reviews</span>
              </div>
              <div className="flex items-center mt-2">
                <MapPin className="h-5 w-5 text-gray-400 mr-1" />
                <span className="text-sm text-gray-600">{clinic.location}</span>
              </div>
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View on Map</Button>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

