// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Providers } from '@/components/providers';
import { pressStart } from '@/lib/styles/fonts';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
};

export const metadata: Metadata = {
  title: 'HeroxShorts - Transform Your Content with AI',
  description: 'Create content that matters. Fast, efficient, and powered by AI in 1 click.',
  keywords: [
    'short videos',
    'video creation',
    'AI video',
    'viral content',
    'video editing',
    'content creation'
  ],
  authors: [{ name: 'Sharif Zafar & HeroxShorts Team' }],
  creator: 'Sharif Zafar',
  publisher: 'Sharif Zafar',
  icons: {
    icon: './heroxshorts.ico',
    apple: './heroxshorts.ico',
  },
  manifest: './manifest.json',
  openGraph: {
    type: 'website',
    title: 'HeroxShorts - Transform Your Content with AI',
    description: 'Create content that matters. Fast, efficient, and powered by AI in 1 click.',
    siteName: 'HeroxShorts',
    url: 'https://heroxshorts.com', // Replace with your actual domain
    locale: 'en_US',
    images: [
      {
        url: './showcase/image-2.webp', // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'HeroxShorts Preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HeroxShorts - Create Viral Short Videos',
    description: 'AI-powered short video creation platform',
    images: ['/twitter-image.png'], // Replace with your actual Twitter card image
    creator: '@heroshots', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification', // Replace with your verification code
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
  alternates: {
    canonical: 'https://heroshots.com', // Replace with your domain
    languages: {
      'en-US': 'https://heroshots.com',
      // Add more language versions if available
    },
  },
  assets: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net',
  ],
  category: 'technology',
};

// Application shell layout configuration
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${pressStart.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <Providers pressStart={pressStart.variable}>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
          >
            Skip to main content
          </a>

          {/* Main content */}
          <main id="main-content" className="relative">
            {children}
          </main>

          {/* Toast notifications */}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}