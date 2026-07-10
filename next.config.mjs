/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
	"default-src 'self'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
	"object-src 'none'",
	"img-src 'self' data: blob:",
	"font-src 'self'",
	`script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://analytics.tomkoreny.com`,
	"style-src 'self' 'unsafe-inline'",
	`connect-src 'self' https://analytics.tomkoreny.com${isDevelopment ? " ws: wss:" : ""}`,
	"upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
	{ key: "Content-Security-Policy", value: contentSecurityPolicy },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "X-XSS-Protection", value: "0" },
	{
		key: "Permissions-Policy",
		value: "camera=(), geolocation=(), microphone=()",
	},
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
];

const nextConfig = {
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/:path*",
				has: [{ type: "host", value: "tomkoreny.com" }],
				destination: "https://www.tomkoreny.com/:path*",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
