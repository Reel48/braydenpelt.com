import type { Metadata } from 'next'
import { Lora, Source Sans Pro } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// McKinsey-style typography: serif for body, sans-serif for headings
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const sourceSansPro = Source Sans Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Brayden Pelt - Personal Website',
  description: 'Personal website and blog by Brayden Pelt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${sourceSansPro.variable} font-body`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

