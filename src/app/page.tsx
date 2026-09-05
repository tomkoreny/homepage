import type { Metadata } from "next";
import { profile } from "../profile";
import { InternalLink } from "./internal-link";
import { LinkCard } from "./link-card";
import { ThemeToggle } from "./theme-toggle";
import { TkMark } from "./tk-mark";

const description = `${profile.subtitle} ${profile.intro}`;

export const metadata: Metadata = {
	title: "Tom Korený — Software Developer & DevOps Engineer",
	description,
	alternates: {
		canonical: "/",
		types: {
			"text/plain": "/about.txt",
			"application/json": "/about.json",
		},
	},
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

const siteUrl = profile.canonicalUrl;
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebSite",
			"@id": websiteId,
			url: profile.canonicalUrl,
			name: profile.name,
			description,
			inLanguage: "en",
			author: { "@id": personId },
		},
		{
			"@type": "Person",
			"@id": personId,
			name: profile.name,
			url: profile.canonicalUrl,
			description,
			jobTitle: "Software Developer and DevOps Engineer",
			homeLocation: {
				"@type": "Place",
				name: "Prague, Czech Republic",
			},
			knowsAbout: profile.tools,
			sameAs: profile.linkGroups.flatMap((group) =>
				group.links.map((link) => link.href),
			),
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

			<div className="punk-shell">
				<header className="punk-hero">
					<div className="mark-column">
						<TkMark />
					</div>

					<div className="name-block">
						<h1>
							<span>Tom</span>
							{" "}
							<span>Korený</span>
						</h1>
						<p className="role-line">{profile.subtitle}</p>
						<p className="hero-copy">{profile.intro}</p>
					</div>
				</header>

				<section className="primary-section" aria-labelledby="main-destinations">
					<h2 id="main-destinations" className="sr-only">
						Main destinations
					</h2>
					<div className="primary-links-grid">
						{profile.primaryLinks.map((link) => (
							<LinkCard
								key={link.label}
								className={`primary-${link.id}`}
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
						{profile.linkGroups.map((group) => (
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
					<h2 id="toolbox">Tools of the trade</h2>
					<ul aria-label="Tools of the trade">
						{profile.tools.map((tool) => (
							<li key={tool}>{tool}</li>
						))}
					</ul>
				</section>

				<footer>
					<div className="footer-identity">
						<p>{profile.name} · {new Date().getFullYear()}</p>
						<p className="commercial-details">
							<a
								className="footer-link"
								href={profile.business.aresUrl}
								rel="noopener noreferrer"
								target="_blank"
							>
								IČO {profile.business.ico}
							</a>
							<span aria-hidden="true"> · </span>
							<span>DIČ {profile.business.dic}</span>
						</p>
					</div>
					<InternalLink className="footer-link" href="/privacy">
						Privacy
					</InternalLink>
				</footer>
			</div>
		</main>
	);
}
