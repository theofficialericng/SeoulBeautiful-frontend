import Image from "next/image"
import Link from "next/link"

const FeaturedClinics = () => {
  const clinics = [
    { id: 1, name: "Seoul Beauty Clinic", image: "/images/clinic1.jpg" },
    { id: 2, name: "Gangnam Plastic Surgery", image: "/images/clinic2.jpg" },
    { id: 3, name: "K-Style Aesthetics", image: "/images/clinic3.jpg" },
  ]

  return (
    <section className="featured-clinics py-16">
      <h2 className="text-3xl font-semibold mb-8">Featured Clinics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {clinics.map((clinic) => (
          <Link href={`/clinics/${clinic.id}`} key={clinic.id} className="group">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={clinic.image || "/placeholder.svg"}
                alt={clinic.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">{clinic.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default FeaturedClinics

