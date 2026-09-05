export const TK_MARK_VIEWBOX = "0 0 320 220";
export const TK_MARK_PATHS = [
	"M14 21 247 5l10 52-88 7 25 135-70 14L97 69l-73 7Z",
	"M145 108 262 20 307 55 178 136Z",
	"M169 119 314 171 287 215 142 145Z",
];

function MarkSvg() {
	return (
		<svg viewBox={TK_MARK_VIEWBOX} focusable="false" aria-hidden="true">
			{TK_MARK_PATHS.map((path) => (
				<path d={path} key={path} />
			))}
		</svg>
	);
}

export function TkMark() {
	return (
		<div className="tk-mark" aria-hidden="true">
			<span className="tk-mark-layer tk-mark-underprint">
				<MarkSvg />
			</span>
			<span className="tk-mark-layer tk-mark-ink">
				<MarkSvg />
			</span>
		</div>
	);
}
