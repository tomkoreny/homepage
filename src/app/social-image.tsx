import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "../profile";
import { TK_MARK_PATHS, TK_MARK_VIEWBOX } from "./tk-mark";

function asArrayBuffer(data: Uint8Array) {
	return data.buffer.slice(
		data.byteOffset,
		data.byteOffset + data.byteLength,
	) as ArrayBuffer;
}

const headingFont = readFile(
	join(process.cwd(), "public/fonts/bowlby-one-sc-regular.ttf"),
).then(asArrayBuffer);
const bodyFont = readFile(
	join(process.cwd(), "public/fonts/liberation-sans-regular.ttf"),
).then(asArrayBuffer);
function Mark({ color, left, top }: { color: string; left: number; top: number }) {
	return (
		<svg
			viewBox={TK_MARK_VIEWBOX}
			width="520"
			height="358"
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

export async function createSocialImage() {
	const [bodyFontData, headingFontData] = await Promise.all([
		bodyFont,
		headingFont,
	]);

	return new ImageResponse(
		<div
			style={{
				background: "#e9edf2",
				color: "#090a0c",
				display: "flex",
				fontFamily: "Body",
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
			<Mark color="#ff5a1f" left={32} top={113} />
			<Mark color="#263cff" left={20} top={101} />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					left: "500px",
					position: "absolute",
					top: "170px",
					width: "650px",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						fontFamily: "Heading",
						fontSize: 82,
						fontWeight: 400,
						letterSpacing: "-4px",
						lineHeight: 0.84,
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
						marginTop: "30px",
						transform: "skewX(-24deg)",
						width: "470px",
					}}
				/>
				<div
					style={{
						display: "flex",
						fontFamily: "Body",
						fontSize: 25,
						fontWeight: 400,
						marginTop: "25px",
					}}
				>
					{profile.subtitle}
				</div>
			</div>
		</div>,
		{
			fonts: [
				{
					name: "Body",
					data: bodyFontData,
					weight: 400,
				},
				{
					name: "Heading",
					data: headingFontData,
					weight: 400,
				},
			],
			width: 1200,
			height: 630,
		},
	);
}
