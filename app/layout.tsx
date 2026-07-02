import type { Metadata } from "next";
import { cookies } from "next/headers";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  const isDark = theme === "dark";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${
        isDark ? "dark" : ""
      }`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              try {
                const stored = document.cookie
                  .split('; ')
                  .find(cookie => cookie.startsWith('theme='))
                  ?.split('=')[1];

                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                const theme = stored || (prefersDark ? 'dark' : 'light');

                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (_) {}
            })();
      `,
          }}
        />
      </head>
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
