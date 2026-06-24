import type { Metadata } from "next";
import { JetBrains_Mono, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  preload: false,
});

export const metadata: Metadata = {
  title: "José Ñiquen",
  description: "Portafolio profesional de desarrollador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body
        className="font-sans flex flex-col min-h-screen bg-white bg-gradient-to-r from-custom-light-bg to-custom-light-bg/95 dark:bg-gradient-to-r dark:from-custom-dark-bg dark:to-custom-dark-bg/95"
      >
        <div className="h-6"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
