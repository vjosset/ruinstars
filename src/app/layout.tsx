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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#b3441b" />
        <link rel="icon" href="/icons/icon-32.png" sizes="32x32" />
        <link rel="icon" href="/icons/icon-16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
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
            gtag('config', 'G-18BMJ4QB5X', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""></link>
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Goldman:wght@400;700&family=Keania+One&family=Oxanium:wght@200..800&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=Russo+One&family=Tektur:wght@400..900&family=Tomorrow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </head>
  
      <body className="text-foreground font-main">
        <ClientProviders session={session}>
          <NavBarTop />
          <main className="pb-16 lg:pb-0">{children}</main>
          <NewsPopup />
          <NavBarBottom />
        </ClientProviders>
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
