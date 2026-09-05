import { ImageResponse } from "next/og";
import { TK_MARK_PATHS, TK_MARK_VIEWBOX } from "./tk-mark";

function Mark({ color, left, top }: { color: string; left: number; top: number }) {
	return (
		<svg
			viewBox={TK_MARK_VIEWBOX}
			width="590"
			height="399"
			style={{
				fill: color,
				left,
				position: "absolute",
				top,
				transform: "rotate(-7deg)",
			}}
		>
			{TK_MARK_PATHS.map((path) => (
				<path d={path} fill={color} key={path} />
			))}
		</svg>
	);
}

export function createSocialImage() {
	return new ImageResponse(
		<div
			style={{
				background: "#e9edf2",
				color: "#090a0c",
				display: "flex",
				height: "100%",
				overflow: "hidden",
				position: "relative",
				width: "100%",
			}}
		>
			<div
				style={{
					background: "#263cff",
					height: "170px",
					position: "absolute",
					right: "-90px",
					top: "18px",
					transform: "rotate(-9deg)",
					width: "760px",
				}}
			/>
			<Mark color="#ff5a1f" left={-29} top={88} />
			<Mark color="#263cff" left={-42} top={76} />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					left: "410px",
					position: "absolute",
					top: "155px",
					width: "730px",
				}}
			>
				<div
					style={{
						alignSelf: "flex-start",
						background: "#090a0c",
						color: "#e9edf2",
						display: "flex",
						fontSize: 22,
						fontWeight: 800,
						padding: "7px 12px",
						transform: "rotate(-2deg)",
					}}
				>
					tomkoreny.com
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						fontSize: 100,
						fontWeight: 900,
						letterSpacing: "-7px",
						lineHeight: 0.8,
						marginTop: "20px",
						textTransform: "uppercase",
					}}
				>
					<span>Tom</span>
					<span>Korený</span>
				</div>
				<div
					style={{
						background: "#ff5a1f",
						display: "flex",
						height: "12px",
						marginTop: "28px",
						transform: "skewX(-24deg)",
						width: "430px",
					}}
				/>
				<div
					style={{
						display: "flex",
						fontSize: 27,
						fontWeight: 700,
						marginTop: "24px",
					}}
				>
					Software / infrastructure / electric rally
				</div>
			</div>
		</div>,
		{ width: 1200, height: 630 },
	);
}
