import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				blue: '#5e8791',
				green: '#8cb89d',
				tan: '#f0f5e8',
				white: '#ffffff',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'loading-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'marquee': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'loading-spin': 'loading-spin 1s linear infinite',
				'marquee': 'marquee 48s linear infinite'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)'
			},
			ringWidth: {
				'focus': 'var(--focus-ring-width)',
			},
			ringOffsetWidth: {
				'focus': 'var(--focus-ring-offset)',
			},
			ringColor: {
				'focus': 'var(--focus-ring-color)',
				'focus-transparent': 'var(--focus-ring-color-transparent)',
			},
			transitionProperty: {
				'transform-shadow': 'transform, box-shadow',
			},
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [
		require("tailwindcss-animate"),
		// Add custom plugin for focus-visible styles
		function({ addUtilities }) {
			const newUtilities = {
				'.focus-visible-ring': {
					'&:focus-visible': {
						outline: 'var(--focus-ring-width) solid var(--focus-ring-color)',
						outlineOffset: 'var(--focus-ring-offset)',
						boxShadow: '0 0 0 4px var(--focus-ring-color-transparent)',
					},
				},
			};
			addUtilities(newUtilities);
		},
	],
} satisfies Config;
