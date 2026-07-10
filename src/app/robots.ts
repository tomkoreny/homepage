import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: "https://www.tomkoreny.com/sitemap.xml",
		host: "https://www.tomkoreny.com",
	};
}
