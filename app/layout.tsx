import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components";
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
      <body className="relative h-screen overflow-hidden font-mono bg-background text-foreground">
        <div id="ui-overlay" className="flex flex-col h-full gap-8 p-8">
          <Header />
          <main id="content" className="flex items-end flex-1 h-full gap-8 ">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
