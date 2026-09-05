import type { Metadata } from "next";
import { InternalLink } from "./internal-link";
import { LinkCard } from "./link-card";
import { ThemeToggle } from "./theme-toggle";
import { TkMark } from "./tk-mark";

const description =
	"Software developer and DevOps engineer in Prague. Open-source enthusiast, self-hoster, and rally driver.";

export const metadata: Metadata = {
	title: "Tom Korený — Software Developer & DevOps Engineer",
	description,
	alternates: { canonical: "/" },
	openGraph: {
		title: "Tom Korený — Software Developer & DevOps Engineer",
		description,
		url: "/",
		siteName: "Tom Korený",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Tom Korený — Software Developer and DevOps Engineer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Tom Korený — Software Developer & DevOps Engineer",
		description,
		images: ["/twitter-image"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
};

const primaryLinks = [
	{
		label: "CV",
		description: "Experience, roles, and the useful details",
		href: "https://cv.tomkoreny.com/tom/tom-koreny-cv",
		className: "primary-cv",
	},
	{
		label: "Blog",
		description: "Things worth writing down",
		href: "https://blog.tomkoreny.com",
		className: "primary-blog",
	},
	{
		label: "GitHub",
		description: "Public code and open-source work",
		href: "https://github.com/tomkoreny",
		className: "primary-github",
	},
	{
		label: "Email",
		description: "tom@tomkoreny.com",
		href: "mailto:tom@tomkoreny.com",
		className: "primary-email",
	},
];

const linkGroups = [
	{
		title: "Social",
		links: [
			{ label: "Instagram", href: "https://instagram.com/tomkoreny" },
			{ label: "Facebook", href: "https://facebook.com/puma2254" },
			{ label: "X / Twitter", href: "https://x.com/tomkoreny" },
			{ label: "LinkedIn", href: "https://linkedin.com/in/tomkoreny" },
		],
	},
	{
		title: "Communities",
		links: [
			{
				label: "Mastodon",
				href: "https://mstdn.tomkoreny.com/@tom",
				rel: "me",
			},
			{ label: "Lemmy", href: "https://lemmy.tomkoreny.com/u/tom" },
			{
				label: "Discord",
				href: "https://discordapp.com/users/213647399812464640",
			},
			{ label: "Steam", href: "https://steamcommunity.com/id/puma2254" },
		],
	},
	{
		title: "Self-hosted",
		links: [
			{ label: "Git", href: "https://git.tomkoreny.com" },
			{ label: "Matrix", href: "https://matrix.to/#/@tom:tomkoreny.com" },
		],
	},
];

const techStack = [
	"TypeScript",
	"Python",
	"Go",
	"Ruby",
	"Nix",
	"React",
	"Next.js",
	"Vue",
	"Angular",
	"Node.js",
	"NestJS",
	"Fastify",
	"FastAPI",
	"LVGL",
	"Docker",
	"Kubernetes",
	"Proxmox",
	"NixOS",
	"Terraform",
	"PostgreSQL",
	"Grafana",
	"Prometheus",
	"Loki",
	"Tailscale",
	"Traefik",
	"Git",
	"CI/CD",
	"ArgoCD",
	"Linux",
];

const siteUrl = "https://www.tomkoreny.com";
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebSite",
			"@id": websiteId,
			url: siteUrl,
			name: "Tom Korený",
			description,
			inLanguage: "en",
			author: { "@id": personId },
		},
		{
			"@type": "Person",
			"@id": personId,
			name: "Tom Korený",
			url: siteUrl,
			description,
			jobTitle: "Software Developer and DevOps Engineer",
			homeLocation: {
				"@type": "Place",
				name: "Prague, Czech Republic",
			},
			knowsAbout: [
				"Software development",
				"DevOps",
				"Open source software",
				"Self-hosting",
				"NixOS",
				"Kubernetes",
				"TypeScript",
				"Linux",
			],
			sameAs: [
				"https://github.com/tomkoreny",
				"https://linkedin.com/in/tomkoreny",
				"https://mstdn.tomkoreny.com/@tom",
				"https://lemmy.tomkoreny.com/u/tom",
				"https://instagram.com/tomkoreny",
				"https://facebook.com/puma2254",
				"https://x.com/tomkoreny",
			],
			mainEntityOfPage: { "@id": websiteId },
		},
	],
};

export default function Home() {
	return (
		<main className="punk-page">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
				}}
			/>
			<ThemeToggle />

			<div className="blue-slash" aria-hidden="true" />
			<div className="orange-stamp" aria-hidden="true">
				PRG / CZ
			</div>

			<div className="punk-shell">
				<header className="punk-hero">
					<div className="mark-column">
						<TkMark />
						<p>Code / systems / electric rally</p>
					</div>

					<div className="name-block">
						<p className="intro-line">Hello. I&apos;m</p>
						<h1>
							<span>Tom</span>
							{" "}
							<span>Korený</span>
						</h1>
						<span className="dot-com">.com</span>
						<p className="role-line">
							Software developer. DevOps engineer. Rally driver.
						</p>
						<p className="hero-copy">
							I write code, automate everything, and keep infrastructure alive.
							 On weekends, I trade terminals for electric rally stages. Open
							 source and self-hosting usually connect the two.
						</p>
					</div>
				</header>

				<section className="primary-section" aria-labelledby="main-destinations">
					<h2 id="main-destinations" className="sr-only">
						Main destinations
					</h2>
					<div className="primary-links-grid">
						{primaryLinks.map((link) => (
							<LinkCard
								key={link.label}
								className={link.className}
								description={link.description}
								href={link.href}
								label={link.label}
								variant="primary"
							/>
						))}
					</div>
				</section>

				<div className="torn-rule" aria-hidden="true" />

				<section className="wire-section" aria-labelledby="on-the-wire">
					<h2 id="on-the-wire">On the wire</h2>
					<div className="wire-groups">
						{linkGroups.map((group) => (
							<section className="wire-group" key={group.title}>
								<h3>{group.title}</h3>
								<div className="wire-links">
									{group.links.map((link) => (
										<LinkCard
											key={link.label}
											href={link.href}
											label={link.label}
											relationship={"rel" in link ? link.rel : undefined}
											variant="wire"
										/>
									))}
								</div>
							</section>
						))}
					</div>
				</section>

				<section className="toolbox-section" aria-labelledby="toolbox">
					<h2 id="toolbox">The current pile</h2>
					<ul aria-label="Technology stack">
						{techStack.map((tech) => (
							<li key={tech}>{tech}</li>
						))}
					</ul>
				</section>

				<footer>
					<p>Tom Korený · {new Date().getFullYear()}</p>
					<InternalLink className="footer-link" href="/privacy">
						Privacy
					</InternalLink>
				</footer>
			</div>
		</main>
	);
}
