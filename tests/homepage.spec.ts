import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

declare global {
	interface Window {
		__analyticsConnected?: boolean;
		__analyticsLoaded?: boolean;
	}
}

test.beforeEach(async ({ page }) => {
	await page.route("https://analytics.tomkoreny.com/**", async (route) => {
		if (route.request().url().endsWith("/api/script.js")) {
			await route.fulfill({
				contentType: "application/javascript",
				body: `
          window.__analyticsLoaded = true;
          fetch('https://analytics.tomkoreny.com/api/test', { method: 'POST' })
            .then(() => { window.__analyticsConnected = true; });
        `,
			});
			return;
		}

		await route.fulfill({ status: 204, body: "" });
	});
	await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
});

test("renders the homepage, metadata, links, and analytics under CSP", async ({
	page,
}) => {
	const cspErrors: string[] = [];
	page.on("console", (message) => {
		if (/content security policy/i.test(message.text()))
			cspErrors.push(message.text());
	});

	const response = await page.goto("/");

	await expect(page).toHaveTitle(/Tom Korený/);
	await expect(
		page.getByRole("heading", { level: 1, name: /Tom Korený/i }),
	).toBeVisible();
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		"href",
		/^https:\/\/www\.tomkoreny\.com\/?$/,
	);
	await expect(
		page.locator('link[rel="alternate"][type="text/plain"]'),
	).toHaveAttribute("href", "https://www.tomkoreny.com/about.txt");
	await expect(
		page.locator('link[rel="alternate"][type="application/json"]'),
	).toHaveAttribute("href", "https://www.tomkoreny.com/about.json");
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		"content",
		/opengraph-image/,
	);
	const schemaText = await page
		.locator('script[type="application/ld+json"]')
		.textContent();
	expect(schemaText).not.toBeNull();
	const schema = JSON.parse(schemaText ?? "");
	const website = schema["@graph"].find(
		(node: Record<string, unknown>) => node["@type"] === "WebSite",
	);
	const person = schema["@graph"].find(
		(node: Record<string, unknown>) => node["@type"] === "Person",
	);
	expect(website).toMatchObject({
		"@id": "https://www.tomkoreny.com/#website",
		url: "https://www.tomkoreny.com",
		author: { "@id": "https://www.tomkoreny.com/#person" },
	});
	expect(person).toMatchObject({
		"@id": "https://www.tomkoreny.com/#person",
		name: "Tom Korený",
		url: "https://www.tomkoreny.com",
		mainEntityOfPage: { "@id": "https://www.tomkoreny.com/#website" },
	});
	expect(person.sameAs).toContain("https://github.com/tomkoreny");
	await expect(
		page.getByText(
			"AI wrangler. Infrastructure keeper. Car, animal, and camera enthusiast.",
			{ exact: true },
		),
	).toBeVisible();
	await expect(
		page.getByText(
			"I write code, automate everything, and keep infrastructure alive. The hobby backlog is less manageable. Come along for the ride.",
			{ exact: true },
		),
	).toBeVisible();
	await expect(page.locator('a[href="https://git.tomkoreny.com"]')).toContainText(
		"Source code, served from home.",
	);
	await expect(
		page.locator('a[href="https://github.com/tomkoreny"]'),
	).toContainText("GitHub");
	await expect(
		page.getByRole("heading", { name: "Tools of the trade" }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "IČO 09729852" }),
	).toHaveAttribute(
		"href",
		"https://ares.gov.cz/ekonomicke-subjekty/res/09729852",
	);
	await expect(page.getByText("DIČ CZ9910135730", { exact: true })).toBeVisible();
	await expect(
		page.getByRole("link", { name: /Reddit|Twitch/ }),
	).toHaveCount(0);

	const externalLinks = page.locator('a[target="_blank"]');
	for (const link of await externalLinks.all()) {
		await expect(link).toHaveAttribute("rel", /noopener/);
		await expect(link).toHaveAttribute("rel", /noreferrer/);
	}

	const email = page.getByRole("link", { name: "Email" });
	await expect(email).toHaveAttribute("href", "mailto:tom@tomkoreny.com");
	await expect(email).not.toHaveAttribute("target", "_blank");

	expect(response?.headers()["content-security-policy"]).toContain(
		"default-src 'self'",
	);
	expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
	expect(response?.headers()["referrer-policy"]).toBe(
		"strict-origin-when-cross-origin",
	);
	await expect
		.poll(() => page.evaluate(() => window.__analyticsLoaded))
		.toBe(true);
	await expect
		.poll(() => page.evaluate(() => window.__analyticsConnected))
		.toBe(true);
	expect(cspErrors).toEqual([]);
});

test("keeps page-specific metadata off privacy and not-found pages", async ({
	page,
}) => {
	await page.goto("/privacy");
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		"href",
		"https://www.tomkoreny.com/privacy",
	);
	await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
		"content",
		"https://www.tomkoreny.com/privacy",
	);
	await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
		"content",
		"Privacy · Tom Korený",
	);

	await page.goto("/not-a-real-page");
	await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
		"content",
		/noindex/,
	);
});

test("persists the selected color theme", async ({ page }) => {
	await page.goto("/");
	await page.evaluate(() => localStorage.removeItem("theme"));
	await page.reload();

	await expect(page.locator("html")).not.toHaveClass(/dark/);
	const themeToggle = page.getByRole("button", {
		name: "Switch to dark theme",
	});
	await expect(themeToggle).toHaveAttribute("aria-pressed", "false");
	await themeToggle.click();
	await expect(page.locator("html")).toHaveClass(/dark/);
	await expect(
		page.getByRole("button", { name: "Switch to light theme" }),
	).toHaveAttribute("aria-pressed", "true");
	await expect
		.poll(() => page.evaluate(() => localStorage.getItem("theme")))
		.toBe("dark");

	await page.reload();
	await expect(page.locator("html")).toHaveClass(/dark/);
	await expect(
		page.getByRole("button", { name: "Switch to light theme" }),
	).toHaveAttribute("aria-pressed", "true");
});

test("has no detectable WCAG A or AA violations in either theme", async ({
	page,
}) => {
	await page.goto("/");
	const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
	const lightResults = await new AxeBuilder({ page }).withTags(tags).analyze();
	expect(lightResults.violations).toEqual([]);

	await page.getByRole("button", { name: "Switch to dark theme" }).click();
	await expect(
		page.getByRole("button", { name: "Switch to light theme" }),
	).toHaveAttribute("aria-pressed", "true");
	await expect(page.getByRole("link", { name: "Email" })).toHaveCSS(
		"color",
		"rgb(232, 228, 223)",
	);
	const darkResults = await new AxeBuilder({ page }).withTags(tags).analyze();
	expect(darkResults.violations).toEqual([]);
});

test("reflows at 320px", async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 800 });
	await page.goto("/");

	const dimensions = await page.evaluate(() => ({
		body: document.body.scrollWidth,
		viewport: document.documentElement.clientWidth,
	}));
	expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport);

	const footer = page.locator("footer");
	await footer.scrollIntoViewIfNeeded();
	await expect(footer).toBeInViewport();
	await expect(
		footer.getByRole("link", { name: "IČO 09729852" }),
	).toBeVisible();
	await expect(footer.getByRole("link", { name: "Privacy" })).toBeVisible();
});

test("keeps avatar exports inside their circular safe area", async ({ page }) => {
	await page.goto("/");

	const failures = await page.evaluate(async () => {
		const variants = ["color", "ink", "white"];
		const sizes = [1024, 512, 256, 128, 64, 32];
		const unsafe: string[] = [];

		for (const variant of variants) {
			for (const size of sizes) {
				const image = new Image();
				image.src = `/brand/png/avatars/tk-avatar-${variant}-${size}x${size}.png`;
				await image.decode();

				const canvas = document.createElement("canvas");
				canvas.width = size;
				canvas.height = size;
				const context = canvas.getContext("2d");
				if (!context) throw new Error("Canvas 2D context unavailable");
				context.drawImage(image, 0, 0);
				const pixels = context.getImageData(0, 0, size, size).data;
				const center = size / 2;
				const safeRadius = size * 0.46;

				for (let y = 0; y < size; y += 1) {
					for (let x = 0; x < size; x += 1) {
						const alpha = pixels[(y * size + x) * 4 + 3];
						if (alpha <= 8) continue;
						if (Math.hypot(x + 0.5 - center, y + 0.5 - center) > safeRadius) {
							unsafe.push(`${variant}-${size}`);
							y = size;
							break;
						}
					}
				}
			}
		}

		return unsafe;
	});

	expect(failures).toEqual([]);
});

test("serves explicit and negotiated terminal profiles", async ({ request }) => {
	const plain = await request.get("/about.txt");
	const plainBody = await plain.text();
	expect(plain.headers()["content-type"]).toContain("text/plain");
	expect(plainBody).toContain("TK / TOM KORENÝ");
	expect(plainBody).toContain("Source code, served from home.");
	expect(plainBody).not.toContain("\u001b[");

	const ansi = await request.get("/about.txt?ansi=1");
	const ansiBody = await ansi.text();
	expect(ansiBody).toContain("\u001b[38;2;38;60;255m");
	expect(ansiBody).toContain("████████╗");

	const json = await request.get("/about.json");
	expect(json.headers()["content-type"]).toContain("application/json");
	expect(await json.json()).toMatchObject({
		schemaVersion: 1,
		type: "Person",
		identity: {
			name: "Tom Korený",
			legalName: "Tomáš Korený",
		},
		business: {
			ico: "09729852",
			dic: "CZ9910135730",
		},
	});

	for (const userAgent of [
		"curl/8.12.1",
		"Wget/1.25.0",
		"HTTPie/3.2.4",
		"xh/0.24.1",
	]) {
		const response = await request.get("/", {
			headers: { accept: "*/*", "user-agent": userAgent },
		});
		expect(response.headers()["content-type"]).toContain("text/plain");
		expect(await response.text()).toContain("TK / TOM KORENÝ");
	}

	const explicitHtml = await request.get("/", {
		headers: { accept: "text/html", "user-agent": "curl/8.12.1" },
	});
	expect(explicitHtml.headers()["content-type"]).toContain("text/html");
	expect(await explicitHtml.text()).toContain("<!DOCTYPE html>");
	expect(explicitHtml.headers()["cache-control"]).toMatch(/private|no-store/);

	const explicitJson = await request.get("/", {
		headers: {
			accept: "text/plain;q=0.5, application/json;q=1",
			"user-agent": "curl/8.12.1",
		},
	});
	expect(explicitJson.headers()["content-type"]).toContain("application/json");
	expect(explicitJson.headers().vary).toContain("Accept");
	expect(explicitJson.headers().vary).toContain("User-Agent");
	expect((await explicitJson.json()).identity.name).toBe("Tom Korený");
});

test("publishes crawler discovery files and canonicalizes the host", async ({
	request,
}) => {
	const canonicalRedirect = await request.get("/", {
		headers: { host: "tomkoreny.com" },
		maxRedirects: 0,
	});
	expect(canonicalRedirect.status()).toBe(308);
	expect(canonicalRedirect.headers().location).toMatch(
		/^https:\/\/www\.tomkoreny\.com\/?$/,
	);

	const robots = await request.get("/robots.txt");
	expect(robots.ok()).toBeTruthy();
	expect(await robots.text()).toContain(
		"Sitemap: https://www.tomkoreny.com/sitemap.xml",
	);

	const sitemap = await request.get("/sitemap.xml");
	expect(sitemap.ok()).toBeTruthy();
	const xml = await sitemap.text();
	expect(xml).toContain("https://www.tomkoreny.com/");
	expect(xml).toContain("https://www.tomkoreny.com/privacy");
});

test("delegates Mastodon WebFinger from the apex host", async ({ request }) => {
	const response = await request.get(
		"/.well-known/webfinger?resource=acct:tom@tomkoreny.com",
		{
			headers: { host: "tomkoreny.com" },
			maxRedirects: 0,
		},
	);

	expect(response.status()).toBe(308);
	const location = new URL(response.headers().location);
	expect(location.origin + location.pathname).toBe(
		"https://mstdn.tomkoreny.com/.well-known/webfinger",
	);
	expect(location.searchParams.get("resource")).toBe("acct:tom@tomkoreny.com");
});

test("serves Matrix discovery directly from the apex host", async ({
	request,
}) => {
	const server = await request.get("/.well-known/matrix/server", {
		headers: { host: "tomkoreny.com" },
		maxRedirects: 0,
	});
	expect(server.status()).toBe(200);
	expect(server.headers()["access-control-allow-origin"]).toBe("*");
	expect(await server.json()).toEqual({
		"m.server": "matrix.tomkoreny.com:443",
	});

	const client = await request.get("/.well-known/matrix/client", {
		headers: { host: "tomkoreny.com" },
		maxRedirects: 0,
	});
	expect(client.status()).toBe(200);
	expect(client.headers()["access-control-allow-origin"]).toBe("*");
	expect(await client.json()).toEqual({
		"m.homeserver": {
			base_url: "https://matrix.tomkoreny.com/",
		},
		"org.matrix.msc4143.rtc_foci": [
			{
				type: "livekit",
				livekit_service_url: "https://call.tomkoreny.com/livekit/jwt",
			},
		],
	});
});
