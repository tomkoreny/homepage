export const TK_MARK_PATHS = [
	"M14 21 247 5l10 52-88 7 25 135-70 14L97 69l-73 7Z",
	"m145 108 86-59 43 34-96 53Z",
	"m169 119 106 65-31 34-102-73Z",
];

function MarkSvg() {
	return (
		<svg viewBox="0 0 280 220" focusable="false" aria-hidden="true">
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
