import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});
import JsonLd from "@/components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#070d18" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zacreative — Editorial & Technical Design Studio",
    template: "%s | Zacreative Studio",
  },
  description:
    "Visual solutions for high-impact publications, corporate whitepapers, investor pitch decks, and data-dense annual reports with architectural precision.",
  applicationName: "Zacreative Studio",
  authors: [{ name: "Zacreative Studio", url: siteUrl }],
  creator: "Zacreative Studio",
  publisher: "Zacreative Studio",
  keywords: [
    "Zacreative",
    "Studio Desain Editorial",
    "Layout Buku",
    "Pitch Deck Eksekutif",
    "Desain Laporan Tahunan",
    "Buku Putih Kebijakan",
    "Modern Editorial Tech",
    "Annual Report Design Jakarta",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Zacreative Studio",
    title: "Zacreative — Editorial & Technical Design Studio",
    description:
      "Visual solutions for high-impact publications, corporate whitepapers, investor pitch decks, and data-dense annual reports with architectural precision.",
    images: [
      {
        url: "/images/stitch/home.png",
        width: 1200,
        height: 630,
        alt: "Zacreative Studio Editorial Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zacreative — Editorial & Technical Design Studio",
    description:
      "Visual solutions for high-impact publications, corporate whitepapers, investor pitch decks, and data-dense annual reports.",
    creator: "@zacreative",
    images: ["/images/stitch/home.png"],
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8f9ff] dark:bg-[#070d18] text-[#0b1c30] dark:text-[#f0f4ff] selection:bg-[#dce9ff] dark:selection:bg-[#1a54a4]">
        {children}
      </body>
    </html>
  );
}
