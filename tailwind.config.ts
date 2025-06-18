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
				// Core colors
				'gray-lightest': 'var(--color-gray-lightest)',
				'gray-light': 'var(--color-gray-light)',
				'gray-border': 'var(--color-gray-border)',
				'gray-text': 'var(--color-gray-text)',
				'gray-heading': 'var(--color-gray-heading)',
				'gray-deep': 'var(--color-gray-deep)',
				'white': 'var(--color-white)',
				'black': 'var(--color-black)',

				// Brand colors
				'brand-custom-order': {
					DEFAULT: 'var(--color-brand-custom-order)',
					hover: 'var(--color-brand-custom-order-hover)',
					focus: 'var(--color-brand-custom-order-focus)',
					transparent: {
						10: 'var(--color-brand-custom-order-transparent-10)',
						20: 'var(--color-brand-custom-order-transparent-20)',
						30: 'var(--color-brand-custom-order-transparent-30)',
					},
				},
				'brand-lightning': {
					DEFAULT: 'var(--color-brand-lightning)',
					hover: 'var(--color-brand-lightning-hover)',
					focus: 'var(--color-brand-lightning-focus)',
					transparent: {
						10: 'var(--color-brand-lightning-transparent-10)',
						20: 'var(--color-brand-lightning-transparent-20)',
						30: 'var(--color-brand-lightning-transparent-30)',
					},
				},
				'brand-blanks': {
					DEFAULT: 'var(--color-brand-blanks)',
					hover: 'var(--color-brand-blanks-hover)',
					focus: 'var(--color-brand-blanks-focus)',
					transparent: {
						10: 'var(--color-brand-blanks-transparent-10)',
						20: 'var(--color-brand-blanks-transparent-20)',
						30: 'var(--color-brand-blanks-transparent-30)',
					},
				},
				'brand-basics': {
					DEFAULT: 'var(--color-brand-basics)',
					hover: 'var(--color-brand-basics-hover)',
					focus: 'var(--color-brand-basics-focus)',
					transparent: {
						10: 'var(--color-brand-basics-transparent-10)',
						20: 'var(--color-brand-basics-transparent-20)',
						30: 'var(--color-brand-basics-transparent-30)',
					},
				},
				'brand-design': {
					DEFAULT: 'var(--color-brand-design)',
					hover: 'var(--color-brand-design-hover)',
					focus: 'var(--color-brand-design-focus)',
					transparent: {
						10: 'var(--color-brand-design-transparent-10)',
						20: 'var(--color-brand-design-transparent-20)',
						30: 'var(--color-brand-design-transparent-30)',
					},
				},

				// Semantic colors
				'success': 'var(--color-success)',
				'error': 'var(--color-error)',
				'warning': 'var(--color-warning)',
				'info': 'var(--color-info)',

				// Design system colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},

				// Hero gradient colors
				'sky': {
					400: 'var(--color-sky-blue)',
				},
				'red': {
					400: 'var(--color-red)',
				},
				'green': {
					400: 'var(--color-green)',
				},
				'navy': {
					400: 'var(--color-navy-blue)',
				},
				'purple': {
					400: 'var(--color-purple)',
				},
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
