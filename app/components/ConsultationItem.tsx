"use client"

import { useState } from "react"
import { Calendar, Clock, VideoIcon, User, X, RefreshCw, MapPin } from "lucide-react"
import Link from "next/link"

export default function ConsultationItem({ consultation, onCancel, onReschedule, isPast = false }) {
  const [isRescheduling, setIsRescheduling] = useState(false)
  const [newDate, setNewDate] = useState(consultation.date)
  const [newTime, setNewTime] = useState(consultation.time)

  const handleReschedule = () => {
    onReschedule(consultation.id, newDate, newTime)
    setIsRescheduling(false)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    // In a real app, you would upload this file to your server
    console.log("File uploaded:", file.name)
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">{consultation.doctorName}</h2>
          <p className="text-gray-600">{consultation.specialty}</p>
          <p className="text-gray-600">{consultation.clinicName}</p>
        </div>
        <span
          className={`px-2 py-1 rounded text-sm ${
            consultation.status === "Confirmed"
              ? "bg-green-200 text-green-800"
              : consultation.status === "Pending"
                ? "bg-yellow-200 text-yellow-800"
                : consultation.status === "Completed"
                  ? "bg-blue-200 text-blue-800"
                  : "bg-red-200 text-red-800"
          }`}
        >
          {consultation.status}
        </span>
      </div>
      <div className="space-y-2">
        <p className="flex items-center">
          <Calendar className="mr-2" size={18} /> {consultation.date}
        </p>
        <p className="flex items-center">
          <Clock className="mr-2" size={18} /> {consultation.time}
        </p>
        <p className="flex items-center">
          {consultation.type === "Online Video" ? (
            <VideoIcon className="mr-2" size={18} />
          ) : (
            <User className="mr-2" size={18} />
          )}
          {consultation.type}
        </p>
        <p className="flex items-center">
          <MapPin className="mr-2" size={18} /> {consultation.clinicName}
        </p>
      </div>
      {!isPast && consultation.status !== "Canceled" && (
        <div className="mt-4 space-x-2">
          <button
            onClick={() => onCancel(consultation.id)}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            <X className="inline mr-1" size={18} /> Cancel
          </button>
          {!isRescheduling ? (
            <button
              onClick={() => setIsRescheduling(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              <RefreshCw className="inline mr-1" size={18} /> Reschedule
            </button>
          ) : (
            <div className="mt-2 space-y-2">
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="border rounded px-2 py-1"
              />
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="border rounded px-2 py-1"
              />
              <button
                onClick={handleReschedule}
                className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
              >
                Confirm Reschedule
              </button>
            </div>
          )}
        </div>
      )}
      {!isPast && (
        <div className="mt-4">
          <label htmlFor="medicalRecords" className="block mb-2">
            Upload Medical Records
          </label>
          <input type="file" id="medicalRecords" onChange={handleFileUpload} className="w-full" />
        </div>
      )}
      {isPast && consultation.status === "Completed" && (
        <div className="mt-4">
          <Link
            href={`/reviews/new?doctorId=${consultation.doctorName}&clinicId=${consultation.clinicName}`}
            className="text-blue-600 hover:underline"
          >
            Leave a Review
          </Link>
        </div>
      )}
    </div>
  )
}

