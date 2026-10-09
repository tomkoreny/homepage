type LinkCardProps = {
	className?: string;
	description?: string;
	href: string;
	label: string;
	relationship?: string;
	variant: "primary" | "wire";
};

export function LinkCard({
	className = "",
	description,
	href,
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
			className={`punk-link punk-link-${variant} ${className}`.trim()}
		>
			<strong>{label}</strong>
			{description && <small>{description}</small>}
			{opensInNewTab && (
				<span className="sr-only"> (opens in a new tab)</span>
			)}
		</a>
	);
}
