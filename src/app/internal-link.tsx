import Link from "next/link";
import type { ReactNode } from "react";

type InternalLinkProps = {
	children: ReactNode;
	className: string;
	href: string;
};

export function InternalLink({ children, className, href }: InternalLinkProps) {
	return (
		<Link className={className} href={href}>
			{children}
		</Link>
	);
}
