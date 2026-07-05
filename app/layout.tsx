import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, ThemeToggle } from "@/components";

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen overflow-hidden font-mono bg-background text-foreground">
        {/* <div className="fixed top-0 w-px h-screen -translate-x-1/2 bg-red-500 pointer-events-none z-999 left-1/2" /> */}
        <div className="fixed right-0 p-8 w-min">
          <ThemeToggle />
        </div>
        <div className="flex flex-col justify-center w-3/4 h-full gap-4 mx-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
