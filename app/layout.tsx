import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Aside, Header } from "@/components";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const iwata = localFont({
  src: "../public/iwata.otf",
  variable: "--font-iwata",
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
      className={`${geistSans.variable} ${geistMono.variable} ${iwata.variable} h-full antialiased`}
    >
      <body className="relative h-screen overflow-hidden bg-background text-foreground">
        <ThemeProvider themes={["light", "dark", "beautiful-world"]}>
          <div
            id="ui-overlay"
            className="flex flex-col h-full px-[6vw] py-[6vh]"
          >
            <Header />
            <main id="content" className="flex items-end h-full gap-8">
              <Aside />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
