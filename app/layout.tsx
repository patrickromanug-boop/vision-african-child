
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: {
    default: 'Vision African Child School | Busabala, Wakiso',
    template: '%s | Vision African Child School',
  },
  description:
    'Quality nursery and primary education in Busabala, Wakiso District, Uganda. Nurturing young minds since 2015.',
  keywords: ['school Uganda', 'nursery Busabala', 'primary school Wakiso', 'education Uganda'],
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    siteName: 'Vision African Child Nursery & Primary School',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
