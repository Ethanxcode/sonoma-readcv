import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethan Tran",
  authors: [{ name: 'Ethan Tran' }],
  description: "I Love'd to develop, build, test and deploy software.",
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Ethan Tran",
    description:"I Love'd to develop, build, test and deploy software.",
    url: "https://mysite.com", 
    siteName: "Ethan Tran",
    images: [
      {
        url: "https://mysite.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: '@EthanTran',
    title: "Ethan Tran",
    description: "I Love'd to develop, build, test and deploy software.",
    images: ["https://mysite.com/og-image.jpg"],
    creator: "@EthanTran",
  },
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://mysite.com",
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/favicon-16x16.png',
        },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
