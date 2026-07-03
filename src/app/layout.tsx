import NewsPopup from '@/components/home/NewsPopup'
import NavBarBottom from '@/components/nav/NavBarBottom'
import NavBarTop from '@/components/nav/NavBarTop'
import ServiceWorkerRegister from '@/components/tools/ServiceWorkerRegister'
import { ClientProviders } from '@/components/ui/ClientProviders'
import { authOptions } from '@/lib/auth'
import '@/src/styles/globals.css'
import { getServerSession } from 'next-auth'
import Script from 'next/script'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#b3441b" />
        <link rel="icon" href="/icons/icon-32.png" sizes="32x32" />
        <link rel="icon" href="/icons/icon-16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
  
      <body className="text-foreground font-main">
        {/* Google Tag Manager (GA4) */}
        <Script
          src={'https://www.googletagmanager.com/gtag/js?id=G-18BMJ4QB5X'}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-18BMJ4QB5X');
          `}
        </Script>
        <ClientProviders session={session}>
          <NavBarTop />
          <main className="pb-16 lg:pb-0">{children}</main>
          <NewsPopup />
          <NavBarBottom />
          <div id="modal-root" />
        </ClientProviders>
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
