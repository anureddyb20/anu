import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anu Reddy B | Personal Portfolio",
  description: "Personal portfolio of Anu Reddy B, showcasing projects, skills, and expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
