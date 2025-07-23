import CursorPointer from '@/components/animation/CursorPointer'
import SmoothScrollProvider from '@/components/shared/SmoothScroll'
import ThemeSwitcher from '@/components/theme/ThemeSwitcher'
import { ThemeModeProvider } from '@/utils/Providers'
import { Metadata } from 'next'
import React, { ReactNode, Suspense } from 'react'
import '../scss/main.scss'
import { Providers } from './providers'
import { Poppins } from 'next/font/google'

export const metadata: Metadata = {
  title: 'SmartTask Studios',
  description: 'Your description here',
  icons: {
    icon: '/favicon (2).ico',
    shortcut: '/favicon (2).ico',
    apple: '/favicon (2).ico',
  },
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // ✅ Add required weights
  variable: '--font-poppins',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <SmoothScrollProvider>
              <ThemeModeProvider>
                <ThemeSwitcher />
                <CursorPointer />
                {children}
              </ThemeModeProvider>
            </SmoothScrollProvider>
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
