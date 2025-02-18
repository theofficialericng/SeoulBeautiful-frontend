"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function BookingConsultationButton({ doctorId, doctorName }) {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [comments, setComments] = useState("")

  const handleBooking = () => {
    // In a real app, you would send this data to your backend
    console.log("Booking consultation:", { doctorId, doctorName, date, time, comments })
    // Reset form and close dialog
    setDate("")
    setTime("")
    setComments("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Book Consultation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book a Consultation with {doctorName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Calendar className="h-4 w-4" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Clock className="h-4 w-4" />
            <Select onValueChange={setTime}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">09:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="14:00">02:00 PM</SelectItem>
                <SelectItem value="15:00">03:00 PM</SelectItem>
                <SelectItem value="16:00">04:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="comments" className="text-right">
              Comments
            </label>
            <Textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleBooking}>Book Consultation</Button>
      </DialogContent>
    </Dialog>
  )
}

