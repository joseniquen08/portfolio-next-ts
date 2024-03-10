import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="en">
      <body
        className={`${poppins.className} min-h-screen bg-white bg-gradient-to-r from-custom-ligth-bg to-custom-ligth-bg/95 dark:bg-gradient-to-r dark:from-custom-dark-bg dark:to-custom-dark-bg/95`}
      >
        <div className="h-6"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
