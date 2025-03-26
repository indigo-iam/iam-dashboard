// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // generated with https://www.tailwindshades.com
        primary: {
          DEFAULT: "#002A44",
          hover: "#20385A",
          light: "#4196B4",
          dark: "#022034",
          50: "#B4E2FF",
          100: "#A0DBFF",
          200: "#77CBFF",
          300: "#4EBBFF",
          400: "#25ACFF",
          500: "#009BFC",
          600: "#0082D3",
          700: "#0069AA",
          800: "#005081",
          900: "#003758",
          950: "#002A44",
        },
        secondary: {
          DEFAULT: "#FEFEFE",
          50: "#FEFEFE",
          100: "#F0F0F0",
          200: "#D4D4D4",
          300: "#B8B8B8",
          400: "#9C9C9C",
          500: "#808080",
          600: "#646464",
          700: "#484848",
          800: "#2C2C2C",
          900: "#101010",
          950: "#020202",
        },
        success: {
          DEFAULT: "#3DA657",
          50: "#B6E4C2",
          100: "#A7DFB5",
          200: "#8AD49C",
          300: "#6CC983",
          400: "#4EBE6A",
          500: "#3DA657",
          600: "#2E7D41",
          700: "#1F542C",
          800: "#102B16",
          900: "#010201",
          950: "#000000",
        },
        warning: {
          DEFAULT: "#FFC107",
          50: "#FFEFBF",
          100: "#FFEAAA",
          200: "#FFE081",
          300: "#FFD559",
          400: "#FFCB30",
          500: "#FFC107",
          600: "#CE9A00",
          700: "#967000",
          800: "#5E4600",
          900: "#261C00",
          950: "#0A0700",
        },
        danger: {
          DEFAULT: "#DE2335",
          50: "#F6C3C8",
          100: "#F3B1B7",
          200: "#EE8D97",
          300: "#E96A76",
          400: "#E34656",
          500: "#DE2335",
          600: "#AF1A28",
          700: "#7E131D",
          800: "#4D0C12",
          900: "#1C0407",
          950: "#040101",
        },
        dark: "#021523",
        link: "#98c3ff",
      },
    },
  },
  plugins: [],
};
export default config;
