import { ImageResponse } from "next/og";

export function createSocialImage() {
	return new ImageResponse(
		<div
			style={{
				alignItems: "center",
				background: "#e8e4df",
				color: "#1a1a2e",
				display: "flex",
				height: "100%",
				justifyContent: "center",
				padding: "64px",
				width: "100%",
			}}
		>
			<div
				style={{
					background: "#ffffff",
					border: "8px solid #1a1a2e",
					boxShadow: "18px 18px 0 #1a1a2e",
					display: "flex",
					flexDirection: "column",
					gap: "22px",
					padding: "54px 64px",
					width: "100%",
				}}
			>
				<div
					style={{
						color: "#e34d0f",
						display: "flex",
						fontSize: 92,
						fontWeight: 900,
						letterSpacing: "-4px",
					}}
				>
					TOM KORENÝ
				</div>
				<div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
					Software Developer · DevOps Engineer · Rally Driver
				</div>
				<div
					style={{
						color: "#2438db",
						display: "flex",
						fontSize: 27,
						fontWeight: 700,
					}}
				>
					tomkoreny.com
				</div>
			</div>
		</div>,
		{ width: 1200, height: 630 },
	);
}
