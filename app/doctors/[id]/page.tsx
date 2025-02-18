"use client"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingConsultationButton from "../../components/BookingConsultationButton"

// This would typically come from a database or API
const doctors = [
  {
    id: 1,
    name: "Dr. Kim",
    specialty: "Plastic Surgery",
    certifications: [
      "Board Certified Plastic Surgeon",
      "Member of Korean Society of Plastic and Reconstructive Surgeons",
    ],
    yearsOfExperience: 15,
    photo: "/images/dr-kim.jpg",
    video: "/videos/dr-kim-intro.mp4",
    research: [
      { title: "Advances in Rhinoplasty Techniques", url: "https://example.com/research1" },
      { title: "Patient Satisfaction in Cosmetic Surgery", url: "https://example.com/research2" },
    ],
    languages: ["Korean", "English"],
    rating: 4.8,
    reviews: [
      { id: 1, author: "Jane D.", rating: 5, comment: "Excellent results and care!" },
      { id: 2, author: "John S.", rating: 4, comment: "Very professional and knowledgeable." },
    ],
  },
  // Add more doctors here
]

export default function DoctorPage({ params }: { params: { id: string } }) {
  const doctor = doctors.find((d) => d.id === Number.parseInt(params.id))

  if (!doctor) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={doctor.photo || "/placeholder.svg"}
            alt={doctor.name}
            width={300}
            height={300}
            className="rounded-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{doctor.name}</h1>
          <p className="text-xl text-gray-600">{doctor.specialty}</p>
          <div className="flex items-center mt-2">
            <Star className="text-yellow-500 mr-1" />
            <span>{doctor.rating.toFixed(1)}</span>
          </div>
          <BookingConsultationButton doctorId={doctor.id} doctorName={doctor.name} />
        </div>
        <div className="md:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <h2 className="text-2xl font-semibold mb-4">About {doctor.name}</h2>
              <p>
                Dr. {doctor.name.split(" ")[1]} is a {doctor.specialty} with {doctor.yearsOfExperience} years of
                experience.
              </p>
              <h3 className="text-xl font-semibold mt-4 mb-2">Certifications</h3>
              <ul className="list-disc list-inside">
                {doctor.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold mt-4 mb-2">Languages</h3>
              <p>{doctor.languages.join(", ")}</p>
            </TabsContent>
            <TabsContent value="experience">
              <h2 className="text-2xl font-semibold mb-4">Experience</h2>
              <p>
                {doctor.yearsOfExperience} years of experience in {doctor.specialty}
              </p>
              {doctor.video && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Introduction Video</h3>
                  <video controls className="w-full">
                    <source src={doctor.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </TabsContent>
            <TabsContent value="research">
              <h2 className="text-2xl font-semibold mb-4">Research & Publications</h2>
              <ul className="space-y-2">
                {doctor.research.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews">
              <h2 className="text-2xl font-semibold mb-4">Patient Reviews</h2>
              <div className="space-y-4">
                {doctor.reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="font-semibold mr-2">{review.author}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Star
                            key={value}
                            className={`${value <= review.rating ? "text-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

