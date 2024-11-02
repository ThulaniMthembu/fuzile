import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AnimatePresence } from 'framer-motion'
import { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fuzile Zono | Innovative Procurement Specialist',
  description: 'Portfolio of Fuzile Zono, an Innovative Procurement Specialist with expertise in strategic sourcing and supply chain optimization. Website by Thulani Mthembu.',
  keywords: ['Fuzile Zono', 'Fuzile', 'Zono', 'Zono Fuzile', 'Procurement Specialist', 'Innovative Procurement', 'Supply Chain', 'Strategic Sourcing', 'Portfolio', 'Thulani Mthembu', 'devmajxr'],
  authors: [
    { name: 'Fuzile Zono' },
    { name: 'Thulani Mthembu', url: 'https://devmajxr.co.za' }
  ],
  creator: 'Thulani Mthembu',
  publisher: 'devmajxr.co.za',
  verification: {
    google: 'google523f418b1738107c',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.fuzilezono.co.za',
    siteName: 'Fuzile Zono Portfolio',
    title: 'Fuzile Zono | Innovative Procurement Specialist',
    description: 'Explore the expertise and achievements of Fuzile Zono, an Innovative Procurement Specialist revolutionizing supply chain management. Website crafted by Thulani Mthembu (devmajxr.co.za).',
    images: [
      {
        url: 'https://www.fuzilezono.co.za/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fuzile Zono - Innovative Procurement Specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fuzile Zono | Innovative Procurement Specialist',
    description: 'Discover how Fuzile Zono is transforming procurement and supply chain management with innovative strategies. Website by Thulani Mthembu (devmajxr.co.za).',
    images: ['https://www.fuzilezono.co.za/twitter-image.jpg'],
    creator: '@devmajxr',
    site: '@fuzilezono',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="designer" content="Thulani Mthembu" />
        <meta name="developer" content="Thulani Mthembu" />
        <link rel="author" href="https://devmajxr.co.za" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <Header />
          <AnimatePresence mode="wait">
            <main className="flex-grow">
              {children}
            </main>
          </AnimatePresence>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}