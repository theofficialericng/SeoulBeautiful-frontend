import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Seoul Beautiful</h1>
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Seoul Beautiful is dedicated to connecting patients with trusted Korean clinics, providing comprehensive
            information and support for those seeking cosmetic procedures. We strive to ensure that every patient has
            access to world-class beauty treatments while feeling informed, comfortable, and confident in their choices.
          </CardDescription>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Seoul Beautiful?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Curated selection of top-tier Korean clinics</li>
          <li>Comprehensive information on various cosmetic procedures</li>
          <li>Transparent reviews and ratings from real patients</li>
          <li>Dedicated support throughout your beauty journey</li>
          <li>Commitment to patient safety and satisfaction</li>
        </ul>
      </div>
    </div>
  )
}

