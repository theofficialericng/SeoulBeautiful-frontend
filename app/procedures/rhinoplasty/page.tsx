"use client"
import Image from "next/image"
import Link from "next/link"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "@/components/ui/button"

const rhinoplastyProcedure = {
  title: "Rhinoplasty",
  description: "Rhinoplasty, commonly known as a 'nose job,' is a surgical procedure to change the shape of the nose.",
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
}

export default function RhinoplastyPage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{rhinoplastyProcedure.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={rhinoplastyProcedure.image || "/placeholder.svg"}
            alt={rhinoplastyProcedure.title}
            width={600}
            height={400}
            className="rounded-lg"
          />
          <p className="text-gray-600 mt-4">{rhinoplastyProcedure.description}</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Process</h2>
          <p>{rhinoplastyProcedure.process}</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Risks</h2>
          <ul className="list-disc list-inside">
            {rhinoplastyProcedure.risks.map((risk, index) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Recovery</h2>
          <p>{rhinoplastyProcedure.recovery}</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Cost</h2>
          <p>{rhinoplastyProcedure.cost}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Before & After</h2>
          <div className="grid grid-cols-2 gap-4">
            {rhinoplastyProcedure.beforeAfter.map((image, index) => (
              <Image
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${rhinoplastyProcedure.title} ${index % 2 === 0 ? "Before" : "After"}`}
                width={300}
                height={300}
                className="rounded-lg"
              />
            ))}
          </div>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            {rhinoplastyProcedure.faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Past Patient Reviews</h2>
          <Link href="/reviews?procedure=Rhinoplasty">
            <Button>View Rhinoplasty Reviews</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

