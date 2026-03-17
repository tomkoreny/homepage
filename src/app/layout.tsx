import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
