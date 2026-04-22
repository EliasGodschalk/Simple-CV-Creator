import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professional CV Builder | Create Your Resume",
  description: "A modern, professional, ATS-friendly CV/Résumé Builder. Build, preview in real-time, and download your high-quality PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="h-full bg-[#020617] text-slate-50 flex overflow-hidden">
          <Sidebar />
          <main className="flex-1 h-full overflow-hidden relative">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
