import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Aside, Header, MainCanvas } from "@/components";
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
          <MainCanvas />
          {/* <div className="bg-bottom-left absolute right-[-10%] left-[45%] top-[35%] bottom-[10%] border bg-[url(https://t3.ftcdn.net/jpg/03/56/65/84/360_F_356658435_0RmzeYwPk0NwdHPXSHM4CSMbevQ493v0.jpg)] bg-no-repeat bg-cover"></div> */}
          {/* <div className="bg-bottom-left absolute right-[20%] left-[45%] top-[45%] bottom-[-5%] border bg-[url(https://t3.ftcdn.net/jpg/03/56/65/84/360_F_356658435_0RmzeYwPk0NwdHPXSHM4CSMbevQ493v0.jpg)] bg-no-repeat bg-cover"></div> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
