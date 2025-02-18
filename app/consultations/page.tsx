"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import ConsultationItem from "../components/ConsultationItem"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would typically come from a database or API
const initialConsultations = [
  {
    id: 1,
    doctorName: "Dr. Kim",
    specialty: "Rhinoplasty",
    date: "2023-06-15",
    time: "10:00",
    status: "Confirmed",
    type: "In-person",
    clinicName: "Seoul Beauty Clinic",
  },
  {
    id: 2,
    doctorName: "Dr. Lee",
    specialty: "Eyelid Surgery",
    date: "2023-06-20",
    time: "14:30",
    status: "Pending",
    type: "Online Video",
    clinicName: "Gangnam Plastic Surgery",
  },
  {
    id: 3,
    doctorName: "Dr. Park",
    specialty: "Facelift",
    date: "2023-05-10",
    time: "11:00",
    status: "Completed",
    type: "In-person",
    clinicName: "K-Style Aesthetics",
  },
]

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState(initialConsultations)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
    // In a real app, you would fetch the user's consultations here
  }, [user, router])

  const cancelConsultation = (id) => {
    setConsultations(
      consultations.map((consultation) =>
        consultation.id === id ? { ...consultation, status: "Canceled" } : consultation,
      ),
    )
  }

  const rescheduleConsultation = (id, newDate, newTime) => {
    setConsultations(
      consultations.map((consultation) =>
        consultation.id === id ? { ...consultation, date: newDate, time: newTime, status: "Pending" } : consultation,
      ),
    )
  }

  const upcomingConsultations = consultations.filter((c) => ["Confirmed", "Pending"].includes(c.status))
  const pastConsultations = consultations.filter((c) => ["Completed", "Canceled"].includes(c.status))

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Consultations</h1>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="space-y-6">
            {upcomingConsultations.map((consultation) => (
              <ConsultationItem
                key={consultation.id}
                consultation={consultation}
                onCancel={cancelConsultation}
                onReschedule={rescheduleConsultation}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="space-y-6">
            {pastConsultations.map((consultation) => (
              <ConsultationItem key={consultation.id} consultation={consultation} isPast={true} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

