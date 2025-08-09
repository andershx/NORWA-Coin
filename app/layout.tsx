import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NORWA Coin – RWA på blokkjeden',
  description: 'NORWA Coin gjør virkelige eiendeler tilgjengelige på blokkjeden.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no"><body>{children}</body></html>
  )
}
