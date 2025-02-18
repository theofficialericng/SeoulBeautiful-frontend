"use client"

import { useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useAuth } from "../../contexts/AuthContext"

// This would typically come from a database or API
const procedures = [
  {
    slug: "rhinoplasty",
    title: "Rhinoplasty",
    category: "Facial Procedures",
    description:
      'Rhinoplasty, commonly known as a "nose job," is a surgical procedure to change the shape of the nose.',
    process: "The surgery involves reshaping the bone and cartilage of the nose to achieve the desired appearance.",
    risks: ["Infection", "Bleeding", "Unsatisfactory results"],
    recovery: "Recovery typically takes 1-2 weeks, with full results visible after several months.",
    cost: "The cost ranges from $5,000 to $15,000 depending on the complexity of the procedure.",
    image: "/images/rhinoplasty.jpg",
    beforeAfter: ["/images/rhinoplasty-before-1.jpg", "/images/rhinoplasty-after-1.jpg"],
    faqs: [
      { question: "How long does the surgery take?", answer: "Typically 1-3 hours, depending on complexity." },
      { question: "Is it painful?", answer: "Discomfort is common but manageable with prescribed pain medication." },
    ],
  },
  // Add more procedures here
]

export default function ProcedurePage({ params }: { params: { slug: string } }) {
  const [inquiry, setInquiry] = useState("")
  const { user } = useAuth()
  const procedure = procedures.find((p) => p.slug === params.slug)

  if (!procedure) {
    notFound()
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this inquiry to your backend
    console.log("Inquiry submitted:", inquiry)
    setInquiry("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{procedure.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={procedure.image || "/placeholder.svg"}
            alt={procedure.title}
            width={600}
            height={400}
            className="rounded-lg"
          />
          <p className="text-gray-600 mt-4">{procedure.description}</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Process</h2>
          <p>{procedure.process}</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Risks</h2>
          <ul className="list-disc list-inside">
            {procedure.risks.map((risk, index) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Recovery</h2>
          <p>{procedure.recovery}</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Cost</h2>
          <p>{procedure.cost}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Before & After</h2>
          <div className="grid grid-cols-2 gap-4">
            {procedure.beforeAfter.map((image, index) => (
              <Image
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${procedure.title} ${index % 2 === 0 ? "Before" : "After"}`}
                width={300}
                height={300}
                className="rounded-lg"
              />
            ))}
          </div>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            {procedure.faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Submit an Inquiry</h2>
          {user ? (
            <form onSubmit={handleInquirySubmit}>
              <textarea
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows={4}
                placeholder="Your question about this procedure..."
              ></textarea>
              <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Submit Inquiry
              </button>
            </form>
          ) : (
            <p>
              Please{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                log in
              </a>{" "}
              to submit an inquiry.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

