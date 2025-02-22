import Image from "next/image"
import Link from "next/link"
import SearchBar from "./components/SearchBar"
import FeaturedClinics from "./components/FeaturedClinics"

export default function Home() {
  return (
    <div>
      {/* <section className="hero py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Discover Korean Beauty Transformations</h1>
          <SearchBar />
        </div>
      </section> */}

      <section className="full-width-image relative h-96">
        <Image
          src="/images/korean-beauty-banner.jpg"
          alt="Korean Beauty Transformation"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <p className="text-white text-3xl font-semibold text-center px-4">
          Empowering you with transparent cosmetic surgery insights,
          <br></br> through authentic and unfiltered ex-patient connections.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <section className="featured-procedures py-16">
          <h2 className="text-3xl font-semibold mb-8">Popular Procedures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Rhinoplasty", "Double Eyelid Surgery", "Jaw Reduction"].map((procedure) => (
              <Link href={`/procedures/${procedure.toLowerCase().replace(" ", "-")}`} key={procedure} className="group">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={`/images/procedures/${procedure.toLowerCase().replace(" ", "-")}.jpg`}
                    alt={procedure}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-semibold">{procedure}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <FeaturedClinics />
      </div>
    </div>
  )
}

