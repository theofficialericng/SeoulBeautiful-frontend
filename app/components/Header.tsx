"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { Menu, X, User, Inbox } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import Image from "next/image"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            
            <Image
              src="/images/logos/navbar.png"
              alt="Seoul Beautiful"
              width="150"
              height="50"
            />
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
                {/* <Link href="/profile" className="text-gray-600 hover:text-gray-800">
                  <User className="inline-block mr-1" size={18} />
                  Profile
                </Link> */}
                <button onClick={logout} className="text-gray-600 hover:text-gray-800">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-800">
                  Login
                </Link>
                {/* <Link href="/register" className="text-gray-600 hover:text-gray-800">
                  Register
                </Link> */}
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
                {/* <Link href="/profile" className="text-gray-600 hover:text-gray-800">
                  <User className="inline-block mr-1" size={18} />
                  Profile
                </Link> */}
                <button onClick={logout} className="text-gray-600 hover:text-gray-800">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-800">
                  Login
                </Link>
                {/* <Link href="/register" className="text-gray-600 hover:text-gray-800">
                  Register
                </Link> */}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header

