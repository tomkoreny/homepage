import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "TK mark lab",
	robots: { index: false, follow: false },
};

const LAB_VIEWBOX = "0 0 360 250";
const T_PATH = "M14 21 247 5l10 52-88 7 25 135-70 14L97 69l-73 7Z";

type MarkVariant = {
	name: string;
	note: string;
	paths: readonly string[];
};

const markVariants: MarkVariant[] = [
	{
		name: "00 / Accepted baseline",
		note: "The current homepage mark. Short arms, broad overlap, compact footprint.",
		paths: [
			T_PATH,
			"m145 108 86-59 43 34-96 53Z",
			"m169 119 106 65-31 34-102-73Z",
		],
	},
	{
		name: "01 / Steeper cut",
		note: "Long arms aimed harder toward the top-right and bottom-right corners.",
		paths: [
			T_PATH,
			"M145 108 275 14 321 50 178 136Z",
			"M169 119 322 202 289 240 142 145Z",
		],
	},
	{
		name: "02 / Square reach",
		note: "Aligned outer reach and full-weight strokes create a squarer silhouette.",
		paths: [
			T_PATH,
			"M145 108 279 20 324 55 178 136Z",
			"M169 119 324 194 292 236 142 145Z",
		],
	},
	{
		name: "03 / Open joint",
		note: "The diagonals separate sooner, leaving more air around the K junction.",
		paths: [
			T_PATH,
			"M150 101 278 14 322 49 181 127Z",
			"M181 139 323 201 291 240 149 159Z",
		],
	},
	{
		name: "04 / Offset K",
		note: "Both K roots move right, creating a deliberate split from the T stem.",
		paths: [
			T_PATH,
			"M184 104 283 22 324 54 190 132Z",
			"M191 139 324 199 292 238 187 158Z",
		],
	},
	{
		name: "05 / Compact square",
		note: "Moderate extra reach with steeper endpoints and the original shared roots.",
		paths: [
			T_PATH,
			"M145 108 262 20 307 55 178 136Z",
			"M169 119 309 194 278 232 142 145Z",
		],
	},
];

function Vector({
	className,
	paths,
	style,
}: {
	className?: string;
	paths: readonly string[];
	style?: CSSProperties;
}) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			focusable="false"
			style={style}
			viewBox={LAB_VIEWBOX}
		>
			{paths.map((path) => (
				<path d={path} key={path} />
			))}
		</svg>
	);
}

function LayeredMark({ paths }: { paths: readonly string[] }) {
	return (
		<div className="lab-layered-mark">
			<Vector className="lab-underprint" paths={paths} />
			<Vector className="lab-blue-ink" paths={paths} />
		</div>
	);
}

function SizeStrip({ paths }: { paths: readonly string[] }) {
	return (
		<div className="lab-size-strip">
			{[128, 64, 32, 16].map((size) => (
				<figure key={size}>
					<Vector paths={paths} style={{ width: size }} />
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
					Every specimen uses the same canvas and unchanged T path, so its
					scale stays fixed while only the K changes. The accepted baseline is
					active on the homepage.
				</p>
			</header>

			<section className="logo-comparison" aria-label="TK mark variants">
				{markVariants.map((variant) => (
					<article key={variant.name}>
						<div className="lab-variant-heading">
							<h2>{variant.name}</h2>
							<p>{variant.note}</p>
						</div>
						<LayeredMark paths={variant.paths} />
						<SizeStrip paths={variant.paths} />
					</article>
				))}
			</section>
		</main>
	);
}
