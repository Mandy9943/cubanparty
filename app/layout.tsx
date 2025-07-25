import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Cuban Party.uy | Noches Uruguayas",
  description: "Ven a disfrutar de nuestras fiestas exclusivas en Uruguay: música, tragos y diversión garantizada.",
  metadataBase: new URL("http://localhost:3000"), // por ahora tu entorno local
  icons: {
    icon: "/assets/cuban-party.uy-logo.jpg",
  },
  openGraph: {
    title: "Cuban Party.uy | Noches Uruguayas",
    description: "Ven a disfrutar de nuestras fiestas exclusivas en Uruguay: música, tragos y diversión garantizada.",
    url: "http://localhost:3000", // por ahora tu entorno local
    siteName: "Cuban Party.uy",
    images: [
      {
        url: "/assets/cuban-party.uy-logo.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_UY",
    type: "website", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bebasNeue.className}>
      <body
        className={`${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
