import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { procedureCategories } from '@/app/data';

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
