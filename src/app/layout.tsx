import NewsPopup from '@/components/home/NewsPopup'
import NavBarBottom from '@/components/nav/NavBarBottom'
import NavBarTop from '@/components/nav/NavBarTop'
import ServiceWorkerRegister from '@/components/tools/ServiceWorkerRegister'
import { ClientProviders } from '@/components/ui/ClientProviders'
import { authOptions } from '@/lib/auth'
import '@/src/styles/globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getServerSession } from 'next-auth'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#b3441b" />
        <link rel="icon" href="/icons/icon-32.png" sizes="32x32" />
        <link rel="icon" href="/icons/icon-16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        {/* Fonts are pulled from Google at load time (no build-time fetch); display=swap shows fallback text until they arrive */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;700&family=Russo+One&display=swap" />
      </head>
  
      <body className="text-foreground font-main">
        <ClientProviders session={session}>
          <NavBarTop />
          <main className="pb-16 lg:pb-0">{children}</main>
          <NewsPopup />
          <NavBarBottom />
          <div id="modal-root" />
        </ClientProviders>
        <ServiceWorkerRegister />
        <GoogleAnalytics gaId="G-18BMJ4QB5X" />
      </body>
    </html>
  )
}
