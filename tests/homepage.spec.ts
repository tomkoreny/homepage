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
	await expect(page.getByRole("heading", { level: 2 })).toHaveCount(5);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		"href",
		/^https:\/\/www\.tomkoreny\.com\/?$/,
	);
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		"content",
		/opengraph-image/,
	);

	const externalLinks = page.locator('a[target="_blank"]');
	await expect(externalLinks).toHaveCount(13);
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

test("reflows at 320px and honors reduced motion", async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 800 });
	await page.goto("/");

	const dimensions = await page.evaluate(() => ({
		body: document.body.scrollWidth,
		viewport: document.documentElement.clientWidth,
	}));
	expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport);
	await expect(page.locator(".marquee-track")).toHaveCSS(
		"animation-name",
		"none",
	);
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
