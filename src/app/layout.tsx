import type { Metadata } from "next";
import { Caveat, Courier_Prime, JetBrains_Mono, Playfair_Display, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-editorial",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-handwritten",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aanand Modi — AI/ML Engineer · Full Stack Developer · Published Researcher",
  description: "Portfolio of Aanand Modi. 2× National Hackathon Winner, AI/ML Engineer, Full Stack Developer, and Published Researcher from Ahmedabad, India.",
  openGraph: {
    title: "Aanand Modi",
    description: "AI/ML Engineer · Full Stack Developer · Published Researcher",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${courierPrime.variable} ${caveat.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
