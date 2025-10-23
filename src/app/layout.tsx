import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avotonix | AI Receptionists for Modern Businesses",
  description:
    "Avotonix delivers AI-powered receptionists that greet, qualify, and schedule for your business around the clock.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2ff" },
    { media: "(prefers-color-scheme: dark)", color: "#090423" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
