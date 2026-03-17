import type { Metadata } from "next";
import Script from "next/script";
import { Bowlby_One_SC } from "next/font/google";
import "./globals.css";

const heading = Bowlby_One_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
  },
  title: "Tom Korený",
  description: "DevOps engineer, self-hoster, rally driver. Based in Czech Republic.",
  keywords: ["devops", "infrastructure", "self-hosting", "Tom Korený"],
  authors: [{ name: "Tom Korený" }],
  openGraph: {
    title: "Tom Korený",
    description: "DevOps engineer, self-hoster, rally driver.",
    url: "https://tomkoreny.com",
    siteName: "Tom Korený",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={heading.variable}>
      <body className="antialiased">
        {children}
        <Script
          src="https://analytics.tomkoreny.com/api/script.js"
          data-site-id="f9e239b8f99b"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
