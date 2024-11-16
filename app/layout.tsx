import type { Metadata } from "next";
import { Jura } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/app/components/ui/toaster";
import PlausibleProvider from "next-plausible";

const jura = Jura({
  subsets: ["latin"],
  variable: "--font-jura",
});

const title = "Logo-creator.io – Generate a logo";
const description = "Generate a professional logo for your company in seconds";
const url = "https://www.logo-creator.io/";
const ogimage = "https://www.logo-creator.io/og-image.png";
const sitename = "logo-creator.io";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`h-full ${jura.variable}`}>
        <head>
          <PlausibleProvider domain="logo-creator.io" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <meta name="theme-color" content="#111827" />
        </head>
        <body className="min-h-full bg-gray-900 font-jura text-white antialiased">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
