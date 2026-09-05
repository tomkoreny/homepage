import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "TK mark lab",
	robots: { index: false, follow: false },
};

const LAB_VIEWBOX = "0 0 360 250";
const T_PATH = "M14 21 247 5l10 52-88 7 25 135-70 14L97 69l-73 7Z";
const COMPACT_UPPER_K_PATH = "M145 108 262 20 307 55 178 136Z";

type MarkVariant = {
	name: string;
	note: string;
	paths: readonly string[];
};

const markVariants: MarkVariant[] = [
	{
		name: "05 / Compact square",
		note: "The selected control. Every following mark keeps this T and upper K arm.",
		paths: [
			T_PATH,
			COMPACT_UPPER_K_PATH,
			"M169 119 309 194 278 232 142 145Z",
		],
	},
	{
		name: "06 / Raised lower",
		note: "The lower leg finishes higher, creating a flatter and more compact kick.",
		paths: [
			T_PATH,
			COMPACT_UPPER_K_PATH,
			"M169 119 314 171 287 215 142 145Z",
		],
	},
	{
		name: "07 / Dropped lower",
		note: "The lower leg cuts sharply downward for the strongest diagonal tension.",
		paths: [
			T_PATH,
			COMPACT_UPPER_K_PATH,
			"M169 119 299 215 260 246 142 145Z",
		],
	},
	{
		name: "08 / Short lower",
		note: "A shorter lower leg gives the K a tighter, less dominant footprint.",
		paths: [
			T_PATH,
			COMPACT_UPPER_K_PATH,
			"M169 119 280 179 251 217 142 145Z",
		],
	},
	{
		name: "09 / Extended lower",
		note: "The lower leg reaches farther right while retaining the control angle.",
		paths: [
			T_PATH,
			COMPACT_UPPER_K_PATH,
			"M169 119 339 194 308 239 142 145Z",
		],
	},
	{
		name: "10 / Shifted root",
		note: "Only the lower leg root moves down and right, opening the central junction.",
		paths: [
			T_PATH,
			COMPACT_UPPER_K_PATH,
			"M183 133 309 194 278 232 153 158Z",
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
					Variant 05 is the control. Every specimen keeps its T and upper K arm
					fixed while only the lower leg moves. The accepted original remains
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
