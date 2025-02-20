import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const procedureCategories = [
  {
    name: "Facial Procedures",
    procedures: [
      {
        name: "Rhinoplasty",
        description: "Reshape and enhance the nose for improved facial harmony.",
        image: "/images/rhinoplasty.jpg",
      },
      {
        name: "Facelift",
        description: "Reduce signs of aging and restore a more youthful appearance.",
        image: "/images/facelift.jpg",
      },
      {
        name: "Eyelid Surgery",
        description: "Create a more open, alert look with double eyelid surgery.",
        image: "/images/eyelid-surgery.jpg",
      },
    ],
  },
  {
    name: "Body Contouring",
    procedures: [
      {
        name: "Liposuction",
        description: "Remove stubborn fat deposits for a more sculpted body shape.",
        image: "/images/liposuction.jpg",
      },
      {
        name: "Tummy Tuck",
        description: "Flatten the abdomen by removing excess skin and fat.",
        image: "/images/tummy-tuck.webp",
      },
      {
        name: "Brazilian Butt Lift",
        description: "Enhance buttock shape and size using your own fat.",
        image: "/images/brazilian-butt-lift.webp",
      },
    ],
  },
  {
    name: "Non-Surgical Treatments",
    procedures: [
      {
        name: "Botox",
        description: "Reduce wrinkles and fine lines for a smoother complexion.",
        image: "/images/botox.jpg",
      },
      {
        name: "Dermal Fillers",
        description: "Add volume and contour to various areas of the face.",
        image: "/images/dermal-fillers.jpg",
      },
      {
        name: "Laser Skin Resurfacing",
        description: "Improve skin texture and tone with advanced laser technology.",
        image: "/images/laser-resurfacing.png",
      },
    ],
  },
]

export default function ProceduresPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Procedures</h1>
      <div className="space-y-12">
        {procedureCategories.map((category, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.procedures.map((procedure, procIndex) => (
                <Card key={procIndex} className="overflow-hidden">
                  <Image
                    src={procedure.image || "/placeholder.svg"}
                    alt={procedure.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{procedure.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{procedure.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/procedures/${procedure.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Button>Learn More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

