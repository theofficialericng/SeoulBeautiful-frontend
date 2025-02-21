import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { AuthProvider } from "./contexts/AuthContext"
import type React from "react"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Seoul Beautiful",
  description: "Your trusted guide to Korean plastic surgery procedures and clinics",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>

        <Script id="maze-script" strategy="afterInteractive">
          {`
            (function (m, a, z, e) {
              var s, t;
              try {
                t = m.sessionStorage.getItem('maze-us');
              } catch (err) {}

              if (!t) {
                t = new Date().getTime();
                try {
                  m.sessionStorage.setItem('maze-us', t);
                } catch (err) {}
              }

              s = a.createElement('script');
              s.src = z + '?apiKey=' + e;
              s.async = true;
              a.getElementsByTagName('head')[0].appendChild(s);
              m.mazeUniversalSnippetApiKey = e;
            })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '80ae5902-3e38-4cb2-932a-d2d1d5799323');
          `}
        </Script>
      </body>
    </html>
  )
}



import './globals.css'