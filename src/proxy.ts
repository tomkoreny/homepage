import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
	createJsonProfileResponse,
	createTextProfileResponse,
} from "./profile";

type Representation = "html" | "json" | "text";

type AcceptedType = {
	mediaType: string;
	quality: number;
	order: number;
};

const commandLineClient = /\b(?:curl|wget|httpie|xh)\b/i;

function preferredRepresentation(acceptHeader: string | null) {
	if (!acceptHeader) return undefined;

	const accepted = acceptHeader
		.split(",")
		.map((entry, order): AcceptedType => {
			const [mediaType, ...parameters] = entry.trim().toLowerCase().split(";");
			const qualityParameter = parameters.find((parameter) =>
				parameter.trim().startsWith("q="),
			);
			const parsedQuality = qualityParameter
				? Number.parseFloat(qualityParameter.trim().slice(2))
				: 1;

			return {
				mediaType,
				quality: Number.isFinite(parsedQuality) ? parsedQuality : 0,
				order,
			};
		})
		.filter(({ quality }) => quality > 0)
		.sort((left, right) => right.quality - left.quality || left.order - right.order);

	for (const { mediaType } of accepted) {
		if (mediaType === "application/json" || mediaType.endsWith("+json")) {
			return "json" satisfies Representation;
		}
		if (mediaType === "text/plain") return "text" satisfies Representation;
		if (mediaType === "text/html" || mediaType === "application/xhtml+xml") {
			return "html" satisfies Representation;
		}
	}

	return undefined;
}

export function proxy(request: NextRequest) {
	const preferred = preferredRepresentation(request.headers.get("accept"));
	const ansi = request.nextUrl.searchParams.get("ansi") === "1";

	if (preferred === "json") return createJsonProfileResponse({ vary: true });
	if (preferred === "text") {
		return createTextProfileResponse({ ansi, vary: true });
	}

	if (
		!preferred &&
		commandLineClient.test(request.headers.get("user-agent") ?? "")
	) {
		return createTextProfileResponse({ ansi, vary: true });
	}

	if (
		request.headers.get("host")?.replace(/:\d+$/, "").toLowerCase() ===
		"tomkoreny.com"
	) {
		const canonicalUrl = request.nextUrl.clone();
		canonicalUrl.protocol = "https:";
		canonicalUrl.hostname = "www.tomkoreny.com";
		canonicalUrl.port = "";
		const response = NextResponse.redirect(canonicalUrl, 308);
		response.headers.set("Vary", "Accept, User-Agent");
		return response;
	}

	const response = NextResponse.next();
	response.headers.set("Vary", "Accept, User-Agent");
	return response;
}

export const config = {
	matcher: "/",
};
