import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Sumith Kumar Singh ",
  description:
    "Premium cinematic developer portfolio for Sumith Kumar Singh — fullstack development, DevOps, automation, and cybersecurity-minded engineering.",
  keywords:
    "Sumith Kumar Singh, portfolio, fullstack developer, DevOps, cybersecurity, Next.js, React, TypeScript, automation",
  creator: "Sumith Kumar Singh",
  openGraph: {
    type: "website",
    title: "Sumith Kumar Singh",
    description:
      "Fullstack Developer • DevOps Enthusiast • Cybersecurity Passionate",
    siteName: "Sumith Kumar Singh",
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
      className="font-sans"
    >
      <body className="bg-[var(--bg)] text-[var(--fg)] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
