/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			minHeight: {
				'page': 'calc(100svh - 12px)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				bangladesh: 'hsl(var(--bangladesh))',
				meadow: 'hsl(var(--meadow))',
				"rose-1": 'hsl(var(--rose-1))',
				"rose-2": 'hsl(var(--rose-2))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				'color-1': 'hsl(var(--color-1))',
				'color-2': 'hsl(var(--color-2))',
				'color-3': 'hsl(var(--color-3))',
				'color-4': 'hsl(var(--color-4))',
				'color-5': 'hsl(var(--color-5))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			cursor: {
				fancy: 'url("/cursor-hand.png"), pointer'
			},
			keyframes: {
				sparkle: {
					'0%': {
						'transform': 'scale(0)'
					},
					'100%': {
						'transform': 'scale(1)'
					}
				},
				rotate: {
					'0%': {
						'transform': 'rotate(0deg)'
					},
					'100%': {
						'transform': 'rotate(360deg)'
					}
				},
				typing: {
					'0%': {
						'width': '0%'
					},
					'100%': {
						'width': '100%'
					}
				},
				ellipsis: {
					'0%': {
						'width': '0ch'
					},
					'99%': {
						'width': '3ch'
					},
					'100%': {
						'display': 'none'
					}
				},
				fadein: {
					'from': {
						'opacity': 0,
						'transform': 'translateY(-0.5rem)'
					},
					'to': {
						'opacity': 1,
						'transform': 'translateY(0)'
					}
				},
				rainbow: {
					'0%': {
						'background-position': '0%'
					},
					'100%': {
						'background-position': '200%'
					}
				},
				marquee: {
					"from": {
						transform: "translateX(0)"
					},
					"to": {
						transform: "translateX(calc(-100% - var(--gap)))"
					}
				},
				"marquee-vertical": {
					"from": {
						transform: "translateX(0)"
					},
					"to": {
						transform: "translateY(calc(-100% - var(--gap)))"
					}
				}
			},
			animation: {
				rainbow: 'rainbow var(--speed, 2s) infinite linear',
				marquee: 'marquee var(--duration) infinite linear',
				"marquee-vertical": 'marquee-vertical var(--duration) linear infinite'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
	],
};
