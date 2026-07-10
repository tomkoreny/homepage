import type { ReactNode } from "react";

type LinkCardProps = {
	accent: boolean;
	href: string;
	icon: ReactNode;
	label: string;
	relationship?: string;
};

export function LinkCard({
	accent,
	href,
	icon,
	label,
	relationship,
}: LinkCardProps) {
	const opensInNewTab = href.startsWith("http");
	const rel = opensInNewTab
		? `noopener noreferrer${relationship ? ` ${relationship}` : ""}`
		: undefined;

	return (
		<a
			href={href}
			target={opensInNewTab ? "_blank" : undefined}
			rel={rel}
			className={`neo-link ${accent ? "neo-link-accent" : ""}`}
		>
			<span aria-hidden="true" className="flex w-8 justify-center">
				{icon}
			</span>
			<span>
				{label}
				{opensInNewTab && (
					<span className="sr-only"> (opens in a new tab)</span>
				)}
			</span>
			<span aria-hidden="true" className="ml-auto font-mono text-xs text-fg/65">
				→
			</span>
		</a>
	);
}
