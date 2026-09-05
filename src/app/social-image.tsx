import { ImageResponse } from "next/og";

export function createSocialImage() {
	return new ImageResponse(
		<div
			style={{
				alignItems: "center",
				background: "#f4f5f2",
				color: "#111318",
				display: "flex",
				height: "100%",
				padding: "54px",
				width: "100%",
			}}
		>
			<div
				style={{
					alignItems: "stretch",
					background: "#ffffff",
					border: "8px solid #111318",
					boxShadow: "18px 18px 0 #3155ff",
					display: "flex",
					height: "100%",
					overflow: "hidden",
					position: "relative",
					width: "100%",
				}}
			>
				<div
					style={{
						backgroundImage:
							"repeating-linear-gradient(90deg, #ff4f00 0 34px, #111318 34px 68px)",
						display: "flex",
						height: "18px",
						left: 0,
						position: "absolute",
						top: 0,
						width: "420px",
					}}
				/>
				<div
					style={{
						display: "flex",
						flex: 1,
						flexDirection: "column",
						justifyContent: "center",
						padding: "58px 42px 42px 58px",
					}}
				>
					<div
						style={{
							display: "flex",
							fontSize: 86,
							fontWeight: 900,
							letterSpacing: "-5px",
							lineHeight: 0.9,
						}}
					>
						TOM KORENÝ
					</div>
					<div
						style={{
							display: "flex",
							fontSize: 29,
							fontWeight: 700,
							marginTop: "30px",
						}}
					>
						Software developer. DevOps engineer. Rally driver.
					</div>
					<div
						style={{
							color: "#3155ff",
							display: "flex",
							fontSize: 24,
							fontWeight: 800,
							marginTop: "38px",
						}}
					>
						tomkoreny.com
					</div>
				</div>
				<div
					style={{
						alignItems: "center",
						background: "#ff4f00",
						display: "flex",
						justifyContent: "center",
						width: "310px",
					}}
				>
					<div
						style={{
							alignItems: "center",
							background: "#3155ff",
							border: "16px solid #f4f5f2",
							borderRadius: "50%",
							boxShadow: "10px 10px 0 #111318",
							color: "#ffffff",
							display: "flex",
							fontSize: 96,
							fontWeight: 900,
							height: "210px",
							justifyContent: "center",
							letterSpacing: "-8px",
							width: "210px",
						}}
					>
						TK
					</div>
				</div>
			</div>
		</div>,
		{ width: 1200, height: 630 },
	);
}
