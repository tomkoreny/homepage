import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { profile } from "../profile";
import "./globals.css";

// WOFF2 subsets of the TTF sources in public/fonts. README has the command.
const heading = localFont({
	src: "./fonts/bowlby-one-sc-regular.woff2",
	variable: "--font-heading",
	display: "swap",
	weight: "400",
});
const body = localFont({
	src: [
		{ path: "./fonts/liberation-sans-regular.woff2", weight: "400" },
		{ path: "./fonts/liberation-sans-bold.woff2", weight: "700" },
	],
	variable: "--font-body",
	display: "swap",
});

const siteUrl = new URL("https://www.tomkoreny.com");
const { description } = profile;

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
			{ url: "/favicon.svg?v=tk-mark-1", type: "image/svg+xml" },
			{ url: "/favicon.ico?v=tk-mark-1", sizes: "any" },
		],
		apple: "/apple-touch-icon.png?v=tk-mark-1",
	},
};

// Inline so it runs while the document is parsed. next/script queues
// "beforeInteractive" code until the Next.js runtime loads, which is after
// first paint on a slow connection and flashes the wrong theme.
const themeInitScript = `(() => {
  try {
    const saved = localStorage.getItem('theme');
    const dark = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch {}
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = getComputedStyle(document.documentElement).getPropertyValue('--paper').trim();
  document.head.append(meta);
})();`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${heading.variable} ${body.variable}`}
			suppressHydrationWarning
		>
			<body className="antialiased">
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
