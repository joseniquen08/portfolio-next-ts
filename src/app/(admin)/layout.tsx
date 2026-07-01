import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";

/**
 * Root layout for the (admin) route group.
 * Deliberately excludes the public Navbar and Footer.
 */
export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-zinc-950 text-white antialiased">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
