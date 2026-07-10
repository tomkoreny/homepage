import type { Metadata } from "next";
import { InternalLink } from "../internal-link";

const description =
	"Privacy information for tomkoreny.com, including analytics and local theme storage.";

export const metadata: Metadata = {
	title: "Privacy",
	description,
	alternates: { canonical: "/privacy" },
	openGraph: {
		title: "Privacy · Tom Korený",
		description,
		url: "/privacy",
		siteName: "Tom Korený",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "Privacy · Tom Korený",
		description,
	},
	robots: { index: true, follow: true },
};

export default function PrivacyPage() {
	return (
		<main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-12 md:py-20">
			<article className="neo-card space-y-6 p-6 md:p-8">
				<header className="space-y-2">
					<p className="font-mono text-xs font-bold uppercase tracking-widest text-fg/75">
						tomkoreny.com
					</p>
					<h1 className="font-heading text-4xl uppercase md:text-5xl">
						Privacy
					</h1>
					<p className="text-fg/75">Last updated: July 10, 2026</p>
				</header>

				<section className="space-y-2">
					<h2 className="text-xl font-bold">Analytics</h2>
					<p>
						This site uses a self-hosted Rybbit Analytics instance at{" "}
						<code>analytics.tomkoreny.com</code> to understand aggregate page
						views, referrers, device and browser information, and outbound-link
						usage. Session replay, form tracking, error tracking, and
						button-click tracking are disabled.
					</p>
					<p>
						The homepage does not set analytics cookies or ask the analytics
						service to identify you. Analytics data is not sold or used for
						advertising.
					</p>
				</section>

				<section className="space-y-2">
					<h2 className="text-xl font-bold">Local preferences</h2>
					<p>
						Your light or dark theme preference is stored locally in your
						browser under the <code>theme</code> key. It is never sent to this
						site.
					</p>
				</section>

				<section className="space-y-2">
					<h2 className="text-xl font-bold">Contact</h2>
					<p>
						Questions or data requests can be sent to{" "}
						<code>tom@tomkoreny.com</code>.
					</p>
				</section>

				<InternalLink className="neo-link max-w-48" href="/">
					← Back home
				</InternalLink>
			</article>
		</main>
	);
}
