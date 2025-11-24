import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        accent: "var(--accent)",
        "accent-muted": "var(--accent-muted)",
        ring: "var(--accent-ring)",
      },
      borderRadius: {
        "tablet-xl": "2.5rem",
        "tablet-lg": "1.75rem",
      },
      boxShadow: {
        tablet: "0 20px 60px rgba(0, 0, 0, 0.45)",
        "tablet-glow": "0 0 40px rgba(72, 198, 239, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
