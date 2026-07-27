import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Silkscreen } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const silkscreen = Silkscreen({
  subsets: ['latin'],
  variable: '--font-silkscreen',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'XD VERSE | Minecraft Gaming Community',
  description:
    'Discover huge worlds without any boundaries full of fun and millions of friends in XD VERSE.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#431278',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${plusJakarta.variable} ${silkscreen.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
