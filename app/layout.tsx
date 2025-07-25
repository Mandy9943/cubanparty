import type { Metadata } from "next";
import { Teko } from "next/font/google";
import "./globals.css";

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cuban Party | Noches Uruguayas",
  applicationName: "Cuban Party",
  appleWebApp: {
    title: "Cuban Party",
  },
  description:
    "Ven a disfrutar de nuestras fiestas exclusivas en Uruguay: música, tragos y diversión garantizada.",
  metadataBase: new URL("http://localhost:3000"), // por ahora tu entorno local
  icons: {
    icon: "/assets/cuban-party.uy-logo.jpg",
  },
  openGraph: {
    title: "Cuban Party.uy | Noches Uruguayas",
    description:
      "Ven a disfrutar de nuestras fiestas exclusivas en Uruguay: música, tragos y diversión garantizada.",
    url: "http://localhost:3000", // por ahora tu entorno local
    siteName: "Cuban Party",
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
    <html lang="en" className={teko.className}>
      <body className={`${teko.variable} antialiased`}>{children}</body>
    </html>
  );
}
