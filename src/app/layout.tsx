import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
