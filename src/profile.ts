export type ProfileLink = {
	label: string;
	href: string;
	description?: string;
	rel?: string;
};

export type ProfileLinkGroup = {
	title: string;
	links: readonly ProfileLink[];
};

export const profile = {
	canonicalUrl: "https://www.tomkoreny.com",
	name: "Tom Korený",
	legalName: "Tomáš Korený",
	subtitle:
		"AI wrangler. Infrastructure keeper. Car, animal, and camera enthusiast.",
	intro:
		"I write code, automate everything, and keep infrastructure alive. The hobby backlog is less manageable. Come along for the ride.",
	primaryLinks: [
		{
			id: "cv",
			label: "CV",
			description: "Experience, roles, and the useful details",
			href: "https://cv.tomkoreny.com/tom/tom-koreny-cv",
		},
		{
			id: "blog",
			label: "Blog",
			description: "Things worth writing down",
			href: "https://blog.tomkoreny.com",
		},
		{
			id: "git",
			label: "Git",
			description: "Source code, served from home.",
			href: "https://git.tomkoreny.com",
		},
		{
			id: "email",
			label: "Email",
			description: "tom@tomkoreny.com",
			href: "mailto:tom@tomkoreny.com",
		},
	],
	linkGroups: [
		{
			title: "Work & code",
			links: [
				{ label: "LinkedIn", href: "https://linkedin.com/in/tomkoreny" },
				{ label: "GitHub", href: "https://github.com/tomkoreny" },
			],
		},
		{
			title: "Social",
			links: [
				{ label: "Instagram", href: "https://instagram.com/tomkoreny" },
				{ label: "Facebook", href: "https://facebook.com/puma2254" },
				{ label: "X / Twitter", href: "https://x.com/tomkoreny" },
				{
					label: "Mastodon",
					href: "https://mstdn.tomkoreny.com/@tom",
					rel: "me",
				},
			],
		},
		{
			title: "Communities",
			links: [
				{ label: "Lemmy", href: "https://lemmy.tomkoreny.com/u/tom" },
				{
					label: "Discord",
					href: "https://discordapp.com/users/213647399812464640",
				},
				{ label: "Steam", href: "https://steamcommunity.com/id/puma2254" },
			],
		},
		{
			title: "Direct",
			links: [
				{
					label: "Matrix",
					href: "https://matrix.to/#/@tom:tomkoreny.com",
				},
			],
		},
	] satisfies readonly ProfileLinkGroup[],
	tools: [
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
	],
	business: {
		ico: "09729852",
		dic: "CZ9910135730",
		aresUrl: "https://ares.gov.cz/ekonomicke-subjekty/res/09729852",
	},
	formats: {
		text: "https://www.tomkoreny.com/about.txt",
		json: "https://www.tomkoreny.com/about.json",
	},
} as const;

const blue = "\u001b[38;2;38;60;255m";
const orange = "\u001b[38;2;255;90;31m";
const bold = "\u001b[1m";
const reset = "\u001b[0m";

const ansiBanner = [
	`${blue}████████╗${orange}██╗  ██╗${reset}`,
	`${blue}╚══██╔══╝${orange}██║ ██╔╝${reset}`,
	`${blue}   ██║   ${orange}█████╔╝ ${reset}`,
	`${blue}   ██║   ${orange}██╔═██╗ ${reset}`,
	`${blue}   ██║   ${orange}██║  ██╗${reset}`,
	`${blue}   ╚═╝   ${orange}╚═╝  ╚═╝${reset}`,
].join("\n");

function renderLinks(links: readonly ProfileLink[]) {
	return links.map(
		(link) =>
			`  ${link.label.padEnd(14)} ${link.href}${link.description ? `  —  ${link.description}` : ""}`,
	);
}

export function renderProfileText({ ansi = false } = {}) {
	const section = (title: string) =>
		ansi ? `${orange}${bold}[ ${title} ]${reset}` : `[ ${title} ]`;
	const heading = ansi
		? `${ansiBanner}\n\n${bold}${profile.name}${reset}`
		: `TK / ${profile.name.toUpperCase()}`;
	const lines = [
		heading,
		profile.subtitle,
		"",
		profile.intro,
		"",
		section("PRIMARY"),
		...renderLinks(profile.primaryLinks),
	];

	for (const group of profile.linkGroups) {
		lines.push("", section(group.title.toUpperCase()), ...renderLinks(group.links));
	}

	lines.push(
		"",
		section("TOOLS OF THE TRADE"),
		`  ${profile.tools.join(" / ")}`,
		"",
		section("BUSINESS"),
		`  IČO ${profile.business.ico}  ·  DIČ ${profile.business.dic}`,
		`  ${profile.business.aresUrl}`,
		"",
		section("FORMATS"),
		`  ${profile.formats.text}`,
		`  ${profile.formats.json}`,
	);

	return `${lines.join("\n")}\n`;
}

export function getProfileDocument() {
	return {
		schemaVersion: 1,
		type: "Person",
		canonicalUrl: profile.canonicalUrl,
		identity: {
			name: profile.name,
			legalName: profile.legalName,
			subtitle: profile.subtitle,
			intro: profile.intro,
		},
		primaryLinks: profile.primaryLinks,
		onTheWire: profile.linkGroups,
		tools: profile.tools,
		business: profile.business,
		formats: profile.formats,
	};
}

const alternateLinks = [
	'<https://www.tomkoreny.com/about.txt>; rel="alternate"; type="text/plain"',
	'<https://www.tomkoreny.com/about.json>; rel="alternate"; type="application/json"',
].join(", ");

export function createTextProfileResponse({
	ansi = false,
	vary = false,
} = {}) {
	return new Response(renderProfileText({ ansi }), {
		headers: {
			"Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
			"Content-Language": "en",
			"Content-Type": "text/plain; charset=utf-8",
			Link: alternateLinks,
			...(vary ? { Vary: "Accept, User-Agent" } : {}),
			"X-Content-Type-Options": "nosniff",
		},
	});
}

export function createJsonProfileResponse({ vary = false } = {}) {
	return new Response(`${JSON.stringify(getProfileDocument(), null, 2)}\n`, {
		headers: {
			"Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
			"Content-Language": "en",
			"Content-Type": "application/json; charset=utf-8",
			Link: alternateLinks,
			...(vary ? { Vary: "Accept, User-Agent" } : {}),
			"X-Content-Type-Options": "nosniff",
		},
	});
}
