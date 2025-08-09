import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata={title:'NORWA Coin – RWA på blokkjeden',description:'NORWA Coin – RWA-plattform med rød gradientstil og svart base.'}
export default function RootLayout({children}:{children:React.ReactNode}){return(<html lang="no"><body>{children}</body></html>)}
