"use client"
import Image from "next/image"
import Link from "next/link"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "@/components/ui/button"

const rhinoplastyProcedure = {
  title: "Rhinoplasty",
  description: "Rhinoplasty, commonly known as a 'nose job,' is a surgical procedure to change the shape of the nose. Rhinoplasty for people of Asian or African descent requires a specialized skill set. Surgeons who specialize in what some call ethnic rhinoplasty say that the challenge lies in reshaping and resizing the nose, while retaining its distinct features. It's worth seeking out a surgeon who has the expertise to meet your aesthetic goals, while being sensitive to your racial identity. Make sure that their before and after photo gallery includes pictures of people who look like you, with the kind of result you're after.",
  process: "The surgery involves reshaping the bone and cartilage of the nose to achieve the desired appearance.",
  risks: ["Infection", "Bleeding", "Unsatisfactory results"],
  recovery: "Recovery typically takes 1-2 weeks, with full results visible after several months.",
  cost: "The cost ranges from $5,000 to $15,000 depending on the complexity of the procedure.",
  image: "/images/procedures/rhinoplasty.jpg",
  beforeAfter: ["/images/rhinoplasty-before-1.jpg", "/images/rhinoplasty-after-1.jpg"],
  faqs: [
    { question: "How long does the surgery take?", answer: "Typically 1-3 hours, depending on complexity." },
    { question: "Is it painful?", answer: "The procedure itself isn't painful at all (thanks to anesthesia), and postoperative recovery isn’t too bad. “It’s more of a feeling of congestion like a head cold for a week or two" },
    { question: "What are some pros?", answer: "If you’ve felt self-conscious about your nose for years, good results from this procedure can boost your self-confidence. This nose reshaping surgery balances facial features. It’s an outpatient plastic surgery, so you can go home the same day. " },
    { question: "What are some cons?", answer: "The procedure can be pricey, and insurance won’t cover it if it’s purely a cosmetic procedure. Some patients experience nausea, vomiting, and a sore throat during the first few days of recovery. You can also expect significant swelling and bruising for at least 14 days post-procedure. " },
    { question: "How is nonsurgical rhinoplasty different?", answer: "A nonsurgical or liquid rhinoplasty temporarily reshapes the nose with hyaluronic acid–based injectable fillers, like Restylane Lyft. This off-label treatment is generally quick with no downtime, and results can last up to two years or more, depending on the type of filler used and how your body metabolizes it." },
    { question: "Who's a good candidate for a nose job surgery?", answer: "Whether rhinoplasty surgery is right for you depends on a number of factors, including: your budget, whether you can take up to two weeks off work for recovery, your age: facial features need to reach maturity before nose surgery, so girls should wait until they’re at least 15 and boys until they’re 16." },
    { question: "How to prepare for rhinoplasty", answer: "Halt all blood thinners, including aspirin and ibuprofen, two weeks before surgery (acetaminophen is a safe alternative). Your surgeon will provide a list of drugs to avoid. Stop smoking for six weeks before and after your procedure. Avoid alcohol for at least 48 hours prior to and two weeks after surgery. " },
    { question: "How long does rhinoplasty take to heal?", answer: "It can take up to 2 weeks for the visible bruising and swelling to dissipate, but most patients are back to work in 10-14 days. “The amount of swelling after a rhinoplasty procedure depends upon the type of rhinoplasty performed, the thickness of the skin, the amount of alteration required to the nasal tip, and the patient’s variability with the healing process itself,” says Dr. Portuese." },
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
          {/* <h2 className="text-2xl font-semibold mb-4">Before & After</h2>
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
          </div> */}
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

