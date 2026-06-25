import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {
      fontSize: {
        "2xs": [
          "0.625rem",
          {
            lineHeight: "0.75rem",
          },
        ],
      },
      height: {
        104: "26rem",
        108: "27rem",
        112: "28rem",
        116: "29rem",
        120: "30rem",
        124: "31rem",
        128: "32rem",
        132: "33rem",
        136: "34rem",
        140: "35rem",
        144: "36rem",
        148: "37rem",
        152: "38rem",
      },
      colors: {
        custom: {
          light: {
            text: "#151702",
            bg: "#fbfef1",
            primary: "#d4ff02",
            secondary: "#7eb4f1",
            accent: "#7f5ce0",
          },
          dark: {
            text: "#fbfde8",
            bg: "#0b0e01",
            primary: "#cff122",
            secondary: "#0e4481",
            accent: "#421fa3",
            "accent-text": "#9d83f2",
          },
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
