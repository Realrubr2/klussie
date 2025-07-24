import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Klussie - AI Klusjesman voor al je Klussen",
  description: "Krijg per direct hulp bij uw klussen, en word gematched met ervaren klussers in uw omgeving. Vind snel een klusser bij jou in de buurt.",
    generator: 'Next.js',
  applicationName: 'Klussie',
  keywords: [
    'klusjesman',
    'klusser',
    'klussen',
    'reparatie',
    'onderhoud',
    'Klusser Amsterdam',
    'Klusser Rotterdam',
    'Klusser Utrecht',
    'Klusser Den Haag',
    'loodgieter',
    'AI',
    'klussie',
    'klusjes',
    'klusjesdienst',
    'klusservice',
    'klusjesbedrijf',
    'klusjesman service'
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </LanguageProvider>
  )
}
