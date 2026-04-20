import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://www.bmeconnectsummit.org"),
  title: "BME Connect Summit",
  description:
    "BME Connect Summit brings biomedical students, innovators, and industry partners together through exhibitions, networking, training, and collaboration.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BME Connect Summit",
    description:
      "BME Connect Summit brings biomedical students, innovators, and industry partners together through exhibitions, networking, training, and collaboration.",
    url: "https://www.bmeconnectsummit.org",
    siteName: "BME Connect Summit",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "BME Connect Summit",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BME Connect Summit",
    description:
      "BME Connect Summit brings biomedical students, innovators, and industry partners together through exhibitions, networking, training, and collaboration.",
    images: ["/logo.jpg"],
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
        <Analytics />
      </body>
    </html>
  );
}
