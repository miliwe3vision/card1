import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header/header";
import AuthGuard from "@/components/pages/AuthGuard";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Business Card Scanner",
  description: "Scan, upload and manage business cards easily",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <AuthGuard>
          <Header />
          <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
            {children}
          </main>
        </AuthGuard>
      </body>
    </html>
  );
}
