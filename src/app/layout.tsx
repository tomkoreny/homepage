import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tom Korený | Developer & Creator",
  description: "Personal website of Tom Korený - Developer, Creator, Innovator. Based in Prague.",
  keywords: ["developer", "web developer", "Tom Korený", "portfolio", "Prague"],
  authors: [{ name: "Tom Korený" }],
  openGraph: {
    title: "Tom Korený | Developer & Creator",
    description: "Personal website of Tom Korený - Developer, Creator, Innovator.",
    url: "https://tomkoreny.com",
    siteName: "Tom Korený",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Korený | Developer & Creator",
    description: "Personal website of Tom Korený - Developer, Creator, Innovator.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
