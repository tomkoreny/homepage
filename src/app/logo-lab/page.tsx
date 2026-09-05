import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { TK_MARK_PATHS, TK_MARK_VIEWBOX } from "../tk-mark";

export const metadata: Metadata = {
	title: "TK mark lab",
	robots: { index: false, follow: false },
};

const baselineViewBox = "0 0 280 220";
const baselinePaths = [
	"M14 21 247 5l10 52-88 7 25 135-70 14L97 69l-73 7Z",
	"m145 108 86-59 43 34-96 53Z",
	"m169 119 106 65-31 34-102-73Z",
];

function Vector({
	className,
	paths,
	style,
	viewBox,
}: {
	className?: string;
	paths: string[];
	style?: CSSProperties;
	viewBox: string;
}) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			focusable="false"
			style={style}
			viewBox={viewBox}
		>
			{paths.map((path) => (
				<path d={path} key={path} />
			))}
		</svg>
	);
}

function LayeredMark({ paths, viewBox }: { paths: string[]; viewBox: string }) {
	return (
		<div className="lab-layered-mark">
			<Vector className="lab-underprint" paths={paths} viewBox={viewBox} />
			<Vector className="lab-blue-ink" paths={paths} viewBox={viewBox} />
		</div>
	);
}

function SizeStrip({ paths, viewBox }: { paths: string[]; viewBox: string }) {
	return (
		<div className="lab-size-strip">
			{[128, 64, 32, 16].map((size) => (
				<figure key={size}>
					<Vector paths={paths} style={{ width: size }} viewBox={viewBox} />
					<figcaption>{size}px</figcaption>
				</figure>
			))}
		</div>
	);
}

export default function LogoLabPage() {
	return (
		<main className="logo-lab-page">
			<header>
				<Link href="/">← Homepage</Link>
				<h1>TK mark lab</h1>
				<p>
					The accepted broad-overlap mark against a candidate with longer,
					heavier K strokes. This page is excluded from search indexing.
				</p>
			</header>

			<section className="logo-comparison" aria-label="Large mark comparison">
				<article>
					<h2>Accepted baseline</h2>
					<LayeredMark paths={baselinePaths} viewBox={baselineViewBox} />
				</article>
				<article>
					<h2>Longer K candidate</h2>
					<LayeredMark paths={TK_MARK_PATHS} viewBox={TK_MARK_VIEWBOX} />
				</article>
			</section>

			<section className="logo-scale-check" aria-labelledby="scale-check">
				<h2 id="scale-check">Single-ink size check</h2>
				<div>
					<article>
						<h3>Baseline</h3>
						<SizeStrip paths={baselinePaths} viewBox={baselineViewBox} />
					</article>
					<article>
						<h3>Candidate</h3>
						<SizeStrip paths={TK_MARK_PATHS} viewBox={TK_MARK_VIEWBOX} />
					</article>
				</div>
			</section>
		</main>
	);
}
