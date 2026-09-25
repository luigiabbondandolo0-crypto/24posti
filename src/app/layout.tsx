import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import "./globals.css";

const playfair = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "24 Posti — Ristorante di Mare · Avellino",
  description:
    "Sapori e profumi di mare nel cuore di Avellino. Tradizione e innovazione in un ambiente accogliente. Via Gabriele Speranza, 12.",
  keywords: ["ristorante", "pesce", "Avellino", "24 posti", "mare", "cucina italiana"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${playfair.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF9F7] text-[#1C1917]">
        {children}
      </body>
    </html>
  );
}
