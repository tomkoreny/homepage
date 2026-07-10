"use client";

import { useSyncExternalStore } from "react";

const sunIcon = (
	<svg
		className="h-5 w-5"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
		/>
	</svg>
);

const moonIcon = (
	<svg
		className="h-5 w-5"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 1 0 20.354 15.354Z"
		/>
	</svg>
);

function subscribeToTheme(onChange: () => void) {
	const observer = new MutationObserver(onChange);
	observer.observe(document.documentElement, { attributeFilter: ["class"] });
	return () => observer.disconnect();
}

function getThemeSnapshot() {
	return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
	const dark = useSyncExternalStore(
		subscribeToTheme,
		getThemeSnapshot,
		() => false,
	);

	const toggleTheme = () => {
		const isDark = document.documentElement.classList.toggle("dark");
		localStorage.setItem("theme", isDark ? "dark" : "light");
	};

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="theme-toggle neo-card fixed right-5 top-5 z-50 cursor-pointer p-2.5"
			aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
			aria-pressed={dark}
		>
			<span className="theme-icon theme-icon-moon" aria-hidden="true">
				{moonIcon}
			</span>
			<span className="theme-icon theme-icon-sun" aria-hidden="true">
				{sunIcon}
			</span>
		</button>
	);
}
