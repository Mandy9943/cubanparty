import type { Metadata } from "next";
import { Teko, Work_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title:
    "Cuban Party | Noches Cubanas en Uruguay - Fiestas y Eventos Exclusivos",
  applicationName: "Cuban Party",
  appleWebApp: {
    title: "Cuban Party - Noches Cubanas",
    statusBarStyle: "black-translucent",
  },
  description:
    "Vive las mejores noches cubanas en Uruguay. Fiestas exclusivas con música latina, bailes, tragos premium y la mejor diversión. ¡Únete a la experiencia Cuban Party!",
  keywords: [
    "noches cubanas",
    "fiestas uruguay",
    "eventos exclusivos",
    "música latina",
    "bailes cubanos",
    "diversión nocturna",
    "fiestas temáticas",
    "eventos privados",
    "música caribeña",
    "salsa",
    "reggaeton",
    "cuban party",
  ],
  authors: [{ name: "Cuban Party Uruguay" }],
  creator: "Cuban Party",
  publisher: "Cuban Party",
  metadataBase: new URL(url),
  alternates: {
    canonical: url,
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
    icon: "/assets/cuban-party.uy-logo.jpg",
    apple: "/assets/cuban-party.uy-logo.jpg",
  },
  openGraph: {
    title: "Cuban Party | Noches Cubanas en Uruguay - Fiestas Exclusivas",
    description:
      "Vive las mejores noches cubanas en Uruguay. Fiestas exclusivas con música latina, bailes, tragos premium y diversión garantizada. ¡Únete a Cuban Party!",
    url: url,
    siteName: "Cuban Party Uruguay",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Cuban Party - Noches Cubanas en Uruguay",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cuban Party | Noches Cubanas en Uruguay",
    description:
      "Vive las mejores noches cubanas en Uruguay. Fiestas exclusivas con música latina, bailes y diversión garantizada.",
    images: ["/og.jpg"],
    creator: "@cubanpartyuy",
    site: "@cubanpartyuy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${teko.className} `}>
      <body
        className={`${teko.variable} ${workSans.variable} antialiased bg-neutral-900 overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
