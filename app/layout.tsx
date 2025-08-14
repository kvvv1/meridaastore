import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { ChatSupport } from "@/components/chat-support"
import { PWAInstall } from "@/components/pwa-install"
import { DiscountPopup } from "@/components/discount-popup"
import { SEOSchema } from "@/components/seo-schema"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "MF Store Girls - Moda Feminina Premium | E-commerce Exclusivo",
  description:
    "Descubra a moda feminina premium na MF Store Girls. Vestidos elegantes, blusas sofisticadas e acessórios exclusivos. Frete grátis acima de R$ 199. Programa de fidelidade com pontos e recompensas.",
  keywords:
    "moda feminina, vestidos elegantes, roupas premium, e-commerce moda, blusas femininas, acessórios, MF Store Girls",
  authors: [{ name: "MF Store Girls" }],
  creator: "MF Store Girls",
  publisher: "MF Store Girls",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mfstoregirls.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MF Store Girls - Moda Feminina Premium",
    description: "Descubra a moda feminina premium com peças exclusivas e elegantes",
    url: "https://mfstoregirls.com.br",
    siteName: "MF Store Girls",
    images: [
      {
        url: "/mf-store-logo.jpg",
        width: 1200,
        height: 630,
        alt: "MF Store Girls - Moda Feminina Premium",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MF Store Girls - Moda Feminina Premium",
    description: "Descubra a moda feminina premium com peças exclusivas e elegantes",
    images: ["/mf-store-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B6F47" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MF Store Girls" />
        <link rel="apple-touch-icon" href="/mf-store-logo.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-sans">
        <SEOSchema type="website" />
        <SEOSchema type="organization" />
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
            <ChatSupport />
            <PWAInstall />
            <DiscountPopup />
          </CartProvider>
        </AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
