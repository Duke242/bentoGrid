import { Nunito } from "next/font/google"
import PlausibleProvider from "next-plausible"
import { getSEOTags } from "@/libs/seo"
import ClientLayout from "@/components/LayoutClient"
import config from "@/config"
import "./globals.css"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"

const font = Nunito({ subsets: ["latin"], weight: "400" })

export const viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
}

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags()

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={config.colors.theme} className={font.className}>
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName} />
        </head>
      )}
      <body>
        {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
        <Analytics />
        <Suspense>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
      </body>
    </html>
  )
}
