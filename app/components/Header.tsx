"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, Inbox } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import Image from "next/image"

// inline CSS styling
const imageStyle = {
  borderRadius: '50%',
  border: '5px solid #fff',
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Image src="/images/seoul-beautiful-icon.webp" width={120} height={120} alt="Website Icon" style={imageStyle}/>
          <Link href="/" className="text-4xl font-bold text-gray-800 mr-auto tracking-wide" >
            Seoul Beautiful
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/procedures" className="text-gray-600 hover:text-gray-800">
              Procedures
            </Link>
            <Link href="/clinics" className="text-gray-600 hover:text-gray-800">
              Clinics
            </Link>
            <Link href="/reviews" className="text-gray-600 hover:text-gray-800">
              Reviews
            </Link>
            {user ? (
              <>
                <Link href="/inbox" className="text-gray-600 hover:text-gray-800">
                  <Inbox className="inline-block mr-1" size={18} />
                  Inbox
                </Link>
                <Link href="/profile" className="text-gray-600 hover:text-gray-800">
                  <User className="inline-block mr-1" size={18} />
                  Profile
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-gray-800">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-800">
                  Login
                </Link>
                <Link href="/register" className="text-gray-600 hover:text-gray-800">
                  Register
                </Link>
              </>
            )}
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 py-4 px-4">
            <Link href="/procedures" className="text-gray-600 hover:text-gray-800">
              Procedures
            </Link>
            <Link href="/clinics" className="text-gray-600 hover:text-gray-800">
              Clinics
            </Link>
            <Link href="/reviews" className="text-gray-600 hover:text-gray-800">
              Reviews
            </Link>
            {user ? (
              <>
                <Link href="/inbox" className="text-gray-600 hover:text-gray-800">
                  <Inbox className="inline-block mr-1" size={18} />
                  Inbox
                </Link>
                <Link href="/profile" className="text-gray-600 hover:text-gray-800">
                  <User className="inline-block mr-1" size={18} />
                  Profile
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-gray-800">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-800">
                  Login
                </Link>
                <Link href="/register" className="text-gray-600 hover:text-gray-800">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header

