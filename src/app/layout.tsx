import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Course & Favorite Bands Hub",
  description: "Next.js Web Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col antialiased">
        <Navbar />
        <div className="flex-1 max-w-6xl w-full mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}