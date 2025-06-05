import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/shared/components/shared'
import { CartProvider } from '@/shared/context/cart-context'
import { AuthProvider } from '@/shared/context/auth-context'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Paul Pizza',
  description: 'Лучшая пицца в городе',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<div>Loading Header...</div>}>
              <Header />
            </Suspense>
            {children}
            <Toaster position="top-center" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
