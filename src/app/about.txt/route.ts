import { createTextProfileResponse } from "../../profile";

export function GET(request: Request) {
	const url = new URL(request.url);
	return createTextProfileResponse({ ansi: url.searchParams.get("ansi") === "1" });
}
