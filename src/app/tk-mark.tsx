import tkMark from "./tk-mark.json";

export const TK_MARK_VIEWBOX = tkMark.viewBox;
export const TK_MARK_PATHS = tkMark.paths;

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
