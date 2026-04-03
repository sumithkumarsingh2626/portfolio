import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
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
  title: "Your Portfolio | Full Stack Developer & AI Enthusiast",
  description: "Modern portfolio website showcasing projects, skills, and experience. Built with Next.js, React, and modern web technologies.",
  keywords: "portfolio, web developer, full stack, react, next.js, ai",
  creator: "Your Name",
  openGraph: {
    type: "website",
    url: "https://yourportfolio.com",
    title: "Your Portfolio | Full Stack Developer",
    description: "Premium portfolio showcasing my projects and skills",
    siteName: "Your Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
