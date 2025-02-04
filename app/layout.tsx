import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mood Tracker",
  description: "Track your mood.",
};

const font = Urbanist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
