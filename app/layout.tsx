import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chaotic URL Generator',
  description: 'Create a shortened URL with a twist!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="h-fit bg-gradient-to-bl from-gray-300 to-white overflow-x-hidden" lang="en" >
      <body className={inter.className}>{children}</body>
    </html>
  )
}
