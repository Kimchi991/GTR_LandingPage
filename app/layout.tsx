import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skyline GT-R R34 | Emerald Edition",
  description: "A masterpiece of JDM engineering, refined for the modern era.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/logo-abstract.png" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
