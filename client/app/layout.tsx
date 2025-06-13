import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "PostAlchemy | AI-Powered Content Transformation",
  description: "PostAlchemy helps you effortlessly transform your raw ideas into polished, platform-ready content using powerful AI-driven tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Savate:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={`antialiased`}>{children}</body>
      <Toaster />
    </html>
  );
}
