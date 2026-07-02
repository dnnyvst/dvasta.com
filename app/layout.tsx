import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "danny vasta",
  description: "danny vasta personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col min-h-screen px-4 pb-4 font-mono bg-background text-foreground">
        {/* <div className="fixed top-0 w-px h-screen -translate-x-1/2 bg-red-500 pointer-events-none z-999 left-1/2" /> */}
        <Header />
        <main className="flex flex-col flex-1 w-full max-w-3xl gap-4 mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
