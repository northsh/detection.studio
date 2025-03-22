const animate = require("tailwindcss-animate")
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: [
    'selector',
        'class'
    ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],

  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'DM Sans Variable'
  			]
  		},
  		colors: {
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
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			linear: {
  				'100': '#bcbfd4',
  				'200': '#8f91a1',
  				'300': '#757685',
  				'400': '#4a4a56',
  				'500': '#4d4e5c',
  				'600': '#323242',
  				'700': '#212233',
  				'800': '#171726',
  				'900': '#090a1d'
  			},
  			north: {
  				'50': 'color(display-p3 0.894 0.886 0.953 / <alpha-value>)',
  				'100': 'color(display-p3 0.827 0.82 0.922 / <alpha-value>)',
  				'200': 'color(display-p3 0.714 0.698 0.863 / <alpha-value>)',
  				'300': 'color(display-p3 0.584 0.565 0.796 / <alpha-value>)',
  				'400': 'color(display-p3 0.475 0.451 0.729 / <alpha-value>)',
  				'500': 'color(display-p3 0.361 0.333 0.647 / <alpha-value>)',
  				'600': 'color(display-p3 0.31 0.282 0.576 / <alpha-value>)',
  				'700': 'color(display-p3 0.259 0.235 0.502 / <alpha-value>)',
  				'800': 'color(display-p3 0.208 0.188 0.412 / <alpha-value>)',
  				'900': 'color(display-p3 0.161 0.145 0.333 / <alpha-value>)',
  				'950': 'color(display-p3 0.137 0.125 0.298 / <alpha-value>)'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			},
  			'collapsible-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-collapsible-content-height)'
  				}
  			},
  			'collapsible-up': {
  				from: {
  					height: 'var(--radix-collapsible-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'collapsible-down': 'collapsible-down 0.2s ease-in-out',
  			'collapsible-up': 'collapsible-up 0.2s ease-in-out'
  		}
  	}
  },
  plugins: [animate, require("tailwindcss-animate")],
}
