import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, SideNav } from "@/components";

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
      <body className="h-screen pb-4 overflow-hidden font-mono bg-background text-foreground">
        {/* <div className="fixed top-0 w-px h-screen -translate-x-1/2 bg-red-500 pointer-events-none z-999 left-1/2" /> */}
        <div className="flex flex-col items-center w-3/4 h-full mx-auto">
          <Header />
          <main className="flex justify-center flex-1 min-w-full min-h-0">
            <SideNav />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
