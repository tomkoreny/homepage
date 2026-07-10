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

const siteUrl = new URL("https://www.tomkoreny.com");
const description =
	"Software developer and DevOps engineer in Prague. Open-source enthusiast, self-hoster, and rally driver.";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title: {
		default: "Tom Korený — Software Developer & DevOps Engineer",
		template: "%s · Tom Korený",
	},
	description,
	keywords: [
		"software developer",
		"devops",
		"infrastructure",
		"self-hosting",
		"open source",
		"Tom Korený",
	],
	authors: [{ name: "Tom Korený", url: siteUrl }],
	creator: "Tom Korený",
	icons: {
		icon: [
			{ url: "/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon.ico", sizes: "any" },
		],
		apple: "/apple-touch-icon.png",
	},
};

const themeInitScript = `
  try {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', savedTheme === 'dark' || (!savedTheme && prefersDark));
  } catch {}
`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={heading.variable} suppressHydrationWarning>
			<body className="antialiased">
				<Script id="theme-init" strategy="beforeInteractive">
					{themeInitScript}
				</Script>
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
