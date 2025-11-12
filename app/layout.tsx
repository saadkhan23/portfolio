import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Saad Khan - Portfolio',
  description: 'Portfolio showcasing data engineering, analysis, and web development projects',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saadkhan-portfolio.vercel.app',
    title: 'Saad Khan - Portfolio',
    description: 'Data engineering & strategy projects',
    images: [
      {
        url: 'https://saadkhan-portfolio.vercel.app/og-image.png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
