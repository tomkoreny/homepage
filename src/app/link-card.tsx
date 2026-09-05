import type { ReactNode } from "react";

type LinkCardProps = {
	description?: string;
	href: string;
	icon: ReactNode;
	label: string;
	relationship?: string;
	variant: "featured" | "compact";
};

export function LinkCard({
	description,
	href,
	icon,
	label,
	relationship,
	variant,
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
			className={`link-card link-card-${variant}`}
		>
			<span aria-hidden="true" className="link-icon">
				{icon}
			</span>
			<span className="link-copy">
				<strong>{label}</strong>
				{description && <small>{description}</small>}
				{opensInNewTab && (
					<span className="sr-only"> (opens in a new tab)</span>
				)}
			</span>
			<span className="link-stripe" aria-hidden="true" />
		</a>
	);
}
