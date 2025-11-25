import type { Metadata } from 'next'
import { Lora, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// McKinsey-style typography: serif for headings, sans-serif for body
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const sourceSansPro = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
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

