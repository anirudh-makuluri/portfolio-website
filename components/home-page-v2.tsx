"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BsArrowUpRight, BsGithub, BsLinkedin } from "react-icons/bs";
import { useTheme } from "@/context/theme-context";
import Image from "next/image";
import {
  categorizedSkills,
  certificatesData,
  educationData,
  projectsData,
  recommendationsData,
  workExperienceData,
} from "@/lib/data";
import LiveLocation from "@/components/live-location";

const EMAIL = "anirudh.makuluri@gmail.com";
const GITHUB = "https://github.com/anirudh-makuluri";
const LINKEDIN = "https://www.linkedin.com/in/anirudh-makuluri/";
const RESUME = "/Anirudh_Raghavendra_Makuluri_resume.pdf";

const NOW_DOING = [
  "building SmartDeploy — a deploy-before-you-deploy platform",
  "building Hoplio — a real-time communication platform",
  "writing the what-if-million-users systems series",
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <label
      htmlFor="theme-toggle"
      className="theme-switch relative h-[30px] w-[65px] cursor-pointer overflow-hidden rounded-[15px]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <input
        className="peer"
        id="theme-toggle"
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
      />
      <span className="slider" />

      {/* Clouds — visible in light, slide off-screen left when checked */}
      <svg
        aria-hidden
        className="props absolute -top-[3px] right-[25px] z-[99] w-[15px] peer-checked:-translate-x-16"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="20"
        viewBox="0 0 36 20"
        fill="none"
      >
        <rect y="10" width="36" height="10" rx="5" fill="white" />
        <circle cx="13.5" cy="9.5" r="7.5" fill="white" />
        <circle cx="23.5" cy="7.5" r="7.5" fill="white" />
      </svg>
      <svg
        aria-hidden
        className="props absolute top-1 right-[5px] z-[99] w-[20px] peer-checked:-translate-x-20"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="20"
        viewBox="0 0 36 20"
        fill="none"
      >
        <rect y="10" width="36" height="10" rx="5" fill="white" />
        <circle cx="13.5" cy="9.5" r="7.5" fill="white" />
        <circle cx="23.5" cy="7.5" r="7.5" fill="white" />
      </svg>
      <svg
        aria-hidden
        className="props absolute top-[10px] right-[25px] z-[99] w-[20px] peer-checked:-translate-x-16"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="20"
        viewBox="0 0 36 20"
        fill="none"
      >
        <rect y="10" width="36" height="10" rx="5" fill="white" />
        <circle cx="13.5" cy="9.5" r="7.5" fill="white" />
        <circle cx="23.5" cy="7.5" r="7.5" fill="white" />
      </svg>

      {/* Tree — starts off-screen right, slides into view when checked (dark) */}
      <svg
        aria-hidden
        className="props absolute -right-[43px] top-[7px] z-[99] w-[38px] peer-checked:-translate-x-16"
        xmlns="http://www.w3.org/2000/svg"
        width="68"
        height="29"
        viewBox="0 0 68 29"
        fill="none"
      >
        <path
          d="M20.37 28.42C21.24 27.9 21.37 27.91 21.85 27.65C21.54 27.91 21.49 28.23 21.69 28.61C22.11 27.52 22.66 26.99 23.37 26.99C22.63 27.67 22.46 28.26 22.9 28.77C23.27 28.24 23.61 27.67 23.93 27.08C24.57 27.24 23.94 27.1 23.74 28.62C24.13 29 24.37 28.69 24.47 27.69C24.19 29.93 25.2 28.3 25.34 27.27C25.38 28.03 25.38 28.67 25.37 29.24H26.75C26.75 28.14 26.76 27.18 26.74 27.08C26.67 26.96 28.22 28.92 28.52 28.31C28.53 28.02 28.46 27.77 28.37 27.55C30.49 30.21 29.07 27.29 29.31 27.47C29.73 27.67 30.78 28.93 31.05 28.25C31.14 28.01 31.11 27.88 31.05 27.78C31.24 27.76 31.45 27.73 31.76 27.68C30.54 27.94 32.11 24.71 33.01 24.66C32.21 25.4 32.04 26.03 32.52 26.55C32.98 26.03 33.45 25.63 33.74 25.04C33.73 24.89 33.23 27.4 33.78 26.26C33.81 27.6 33.7 28.57 33.69 29.25H35.35C35.18 27.53 35.17 24.77 35.18 25.54C35.14 25.92 35.22 26.24 35.4 26.5C35.63 26.24 35.69 25.86 35.57 25.4C35.74 25.72 36.85 26.18 36.92 25.99C36.97 25.55 36.89 25.18 36.68 24.85C36.93 25.17 38.3 26.41 38.53 25.93C38.79 25.39 37.74 25.07 37.94 24.59C36.86 23.31 40.41 26.9 39.36 25.01C39.84 25.23 40.96 26.54 41.23 25.81C41.44 25.27 40.93 25.33 40.92 25.02C41.71 25.64 42.08 25.53 42.03 24.72C42.07 24.73 42.1 24.74 42.03 24.72C40.74 24.34 41.86 24.06 40.99 23.48C42.31 23.96 40.19 21.49 39.69 20.7C39.99 21.01 40.24 20.98 40.41 20.59C40.32 20.34 40.18 20.16 40.06 19.96C40.28 19.99 40.49 19.93 40.7 19.72C40.88 19.1 38.28 17.57 38.42 16.59C38.79 17.34 39.17 17.52 39.54 17.11C39.63 16.8 37.98 15.17 37.79 14.86C37.9 14.97 38.64 15.89 38.77 15.68C39.24 14.97 38.22 14.31 37.93 13.77C38.34 13.46 38.68 14.47 38.89 14.03C38.89 13.6 38.8 13.24 38.63 12.92C39.29 13.46 38.04 11.68 37.85 11.23C38.01 11.56 38.2 11.6 38.42 11.4C38.37 10.72 38.07 10.24 37.51 9.99C37.62 9.94 36.24 3.98 35.91 2C36.15 3.43 33 9.44 33.8 9.06C33.13 10.2 33.35 11.04 32.33 11.91C33.22 11.2 31.41 15.6 33.19 13.15C33 13.56 31.71 17.15 31.8 17.12C32.05 16.63 32.25 16.53 32.42 16.76C32.05 17.1 30.44 18.92 32.09 17.61C31.73 18.17 30.97 20.57 30.75 20.74C31.06 20.54 31.18 20.83 31.5 20.58C31.17 23.55 29.53 21.43 28.7 20.08C29.05 20.25 29.45 20.32 29.53 20.05C29.43 19.44 29.2 18.96 28.86 18.58C29.39 17.46 26.87 16.39 27.23 15.01C27.31 15.16 28.61 17.81 28.95 17.15C28.96 16.75 28.88 16.42 28.73 16.11C29.39 16.67 27.98 14.59 27.91 14.4C28.08 14.78 28.3 14.87 28.54 14.66C28.5 14.02 28.21 13.57 27.71 13.31C28.1 13.16 26.62 7.87 26.29 5.77C26.49 7.12 23.54 12.69 24.27 12.37C23.63 13.44 23.84 14.25 22.87 15.02C23.69 14.36 21.98 18.47 23.66 16.21C22.71 18.39 22.32 18.9 22.94 19.58C22.41 20.22 20.7 22.46 22.72 20.32C21.95 21.72 21.04 23.5 21.34 23.28C21.62 23.1 21.73 23.38 22.03 23.15C22.06 22.9 18.91 27.66 22.44 23.64C22.1 24.1 20.1 27.33 20 27.33C20.59 27.33 21.34 26.74 21.73 26.31C21.36 26.93 20.24 28.49 20.37 28.42Z"
          fill="#0c1235"
        />
        <path
          d="M0.37 27.45C1.24 26.93 1.37 26.94 1.85 26.68C1.54 26.94 1.49 27.26 1.69 27.64C2.11 26.55 2.66 26.02 3.37 26.02C2.63 26.7 2.46 27.29 2.9 27.8C3.27 27.27 3.61 26.7 3.93 26.11C4.57 26.27 3.94 26.13 3.74 27.65C4.13 28.03 4.37 27.72 4.47 26.72C4.19 28.96 5.2 27.33 5.34 26.3C5.38 27.06 5.38 27.7 5.37 28.27H6.75C6.75 27.17 6.76 26.21 6.74 26.11C6.67 25.99 8.22 27.95 8.52 27.34C8.53 27.05 8.46 26.8 8.37 26.58C10.49 29.24 9.07 26.32 9.31 26.5C9.73 26.7 10.78 27.96 11.05 27.28C11.14 27.04 11.11 26.91 11.05 26.81C11.24 26.79 11.45 26.76 11.76 26.71C10.54 26.97 12.11 23.74 13.01 23.69C12.21 24.43 12.04 25.06 12.52 25.58C12.98 25.06 13.45 24.66 13.74 24.07C13.73 23.92 13.23 26.43 13.78 25.29C13.81 26.63 13.7 27.6 13.69 28.28H15.35C15.18 26.56 15.17 23.8 15.18 24.57C15.14 24.95 15.22 25.27 15.4 25.53C15.63 25.27 15.69 24.89 15.57 24.43C15.74 24.75 16.85 25.21 16.92 25.02C16.97 24.58 16.89 24.21 16.68 23.88C16.93 24.2 18.3 25.44 18.53 24.96C18.79 24.42 17.74 24.1 17.94 23.62C16.86 22.34 20.41 25.93 19.36 24.04C19.84 24.26 20.96 25.57 21.23 24.84C21.44 24.3 20.93 24.36 20.92 24.05C21.71 24.67 22.08 24.56 22.03 23.75C22.1 23.77 22.07 23.76 22.03 23.75C20.74 23.37 21.86 23.09 20.99 22.51C22.31 22.99 20.19 20.52 19.69 19.73C19.99 20.04 20.24 20.01 20.41 19.62C20.32 19.37 20.18 19.19 20.06 18.99C20.28 19.02 20.49 18.96 20.7 18.75C20.88 18.13 18.28 16.6 18.42 15.62C18.79 16.37 19.17 16.55 19.54 16.14C19.63 15.83 17.98 14.2 17.79 13.89C17.9 14 18.64 14.92 18.77 14.71C19.24 14 18.22 13.34 17.93 12.8C18.34 12.49 18.68 13.5 18.89 13.06C18.89 12.63 18.8 12.27 18.63 11.95C19.29 12.49 18.04 10.71 17.85 10.26C18.01 10.59 18.2 10.63 18.42 10.43C18.37 9.75 18.07 9.27 17.51 9.02C17.62 8.97 16.24 3.01 15.91 1.03C16.15 2.46 13 8.47 13.8 8.09C13.13 9.23 13.35 10.07 12.33 10.94C13.22 10.23 11.41 14.63 13.19 12.18C13 12.59 11.71 16.18 11.8 16.15C12.05 15.66 12.25 15.56 12.42 15.79C12.05 16.13 10.44 17.95 12.09 16.64C11.73 17.2 10.97 19.6 10.75 19.77C11.06 19.57 11.18 19.86 11.5 19.61C11.17 22.58 9.53 20.46 8.7 19.11C9.05 19.28 9.45 19.35 9.53 19.08C9.43 18.47 9.2 17.99 8.86 17.61C9.39 16.49 6.87 15.42 7.23 14.04C7.31 14.19 8.61 16.84 8.95 16.18C8.96 15.78 8.88 15.45 8.73 15.14C9.39 15.7 7.98 13.62 7.91 13.43C8.08 13.81 8.3 13.9 8.54 13.69C8.5 13.05 8.21 12.6 7.71 12.34C8.1 12.19 6.62 6.9 6.29 4.8C6.49 6.15 3.54 11.72 4.27 11.4C3.63 12.47 3.84 13.28 2.87 14.05C3.69 13.39 1.98 17.5 3.66 15.24C2.71 17.42 2.32 17.93 2.94 18.61C2.41 19.25 0.7 21.49 2.72 19.35C1.95 20.75 1.04 22.53 1.34 22.31C1.62 22.13 1.73 22.41 2.03 22.18C2.06 21.93 -1.09 26.69 2.44 22.67C2.1 23.13 0.1 26.36 0 26.36C0.59 26.36 1.34 25.77 1.73 25.34C1.36 25.96 0.24 27.52 0.37 27.45Z"
          fill="#0c1235"
        />
        <path
          d="M42.38 26.3803C43.289 25.9228 43.4019 25.9539 43.9103 25.7229C43.5919 25.9494 43.5252 26.2337 43.7409 26.5757C44.1825 25.6207 44.7577 25.1454 45.4766 25.1632C44.696 25.7629 44.5317 26.2959 44.9785 26.7489C45.4252 26.3225 45.7693 25.8162 46.0466 25.2387C46.7091 25.4475 46.0569 25.141 45.8463 26.6335C46.1185 26.8689 46.3188 26.7889 46.4523 26.438C46.4574 26.6423 46.5242 26.8289 46.6577 26.9932C47.0942 27.1709 47.4742 25.5985 47.4948 25.4519C47.5821 26.8245 47.4075 27.9349 47.3767 28.77H48.9635C48.8967 27.3442 48.9891 25.4608 48.9378 25.3142C48.871 25.2032 50.4476 26.9844 50.7762 26.438C50.7814 26.2159 50.7403 26.016 50.6684 25.8295C53.0974 28.579 51.1973 25.483 51.5876 25.7096C52.0395 25.905 53.1025 27.0554 53.3849 26.4336C53.5955 25.9805 53.082 26.0294 53.0922 25.7717C54.7869 26.5091 53.9755 23.613 55.2696 23.9772C54.335 26.0649 54.7663 26.2381 55.6393 24.5769C55.3672 25.1721 55.3928 25.6651 55.7164 26.0693C56.271 26.2914 56.7434 24.3192 56.7691 24.1327C56.9026 26.1804 56.5945 27.7173 56.6202 28.7789H58.6178C58.5973 27.4419 59.0184 25.714 60.2303 25.6829C59.537 26.2159 59.3881 26.6823 59.7887 27.0865C59.7219 27.1487 61.0365 25.8561 60.9646 25.8162C60.3279 27.2997 60.6 27.4508 61.2317 26.2381C60.9441 26.8511 61.0263 27.1665 61.473 27.1976C61.8274 26.2826 61.7658 27.6418 62.0277 25.9228C62.1098 27.2242 62.0379 28.1304 62.0071 28.7744H63.3577C63.3115 27.6729 63.3423 26.327 63.3372 25.9716C63.635 26.2159 64.7185 26.8245 64.7596 26.8556C64.888 26.9577 64.9188 26.5979 64.8829 26.2337C66.7573 28.1659 65.3399 26.0027 65.6737 26.1493C66.0794 26.3181 67.0346 27.3397 67.2811 26.7934C67.4813 26.3536 66.9781 26.478 67.0192 26.207C67.6816 26.6868 68 26.6246 67.9743 26.016C67.9024 25.9938 67.9024 25.9938 67.923 25.9983C66.9165 25.6918 67.81 25.5097 67.0859 25.0566C68.2157 25.4519 66.4183 23.5286 65.9921 22.9289C66.2643 23.1777 66.4645 23.1599 66.6186 22.8756C66.5313 22.6447 66.3927 22.4625 66.254 22.2804C67.9281 23.5597 64.9034 20.0906 64.9496 19.8019C65.2578 20.3882 65.5813 20.5348 65.9099 20.2372C65.8175 19.7574 65.607 19.371 65.304 19.0601C65.571 18.5581 64.7853 18.0651 64.5594 17.6786C64.9188 17.461 65.1859 18.2206 65.381 17.9052C65.3861 17.5943 65.3091 17.3233 65.1807 17.079C65.7764 17.5409 64.6775 16.1018 64.5183 15.7775C64.6569 16.0218 64.8161 16.0662 65.0061 15.9241C64.9702 15.4088 64.7134 15.0446 64.2461 14.8358C65.3913 14.3428 62.2485 10.0253 62.6901 8.10641C62.3409 9.70105 62.2896 11.2246 61.5193 12.6327C61.3498 12.1441 61.1033 11.7221 60.7952 11.3445C62.4128 12.8459 60.4922 10.3229 60.2662 9.83874C60.4563 10.1808 60.6873 10.2518 60.9544 10.0475C60.903 9.32349 60.5487 8.80823 59.8811 8.51507C60.1071 8.42179 60.2662 9.03032 60.5436 8.55949C60.3792 8.90595 58.2635 0.955002 58.094 0C58.3405 1.37698 54.7972 7.5956 55.4391 7.3513C55.3107 7.5423 53.6623 10.9004 53.5441 10.5583C53.8728 11.5044 53.4312 12.9969 54.638 11.6555C54.4223 12.0774 52.8047 15.8131 52.9022 15.7731C53.2104 15.2667 53.4568 15.1645 53.6623 15.4177C53.1641 15.7909 51.2435 17.5987 53.2412 16.3017C51.8546 18.1673 52.1987 20.1528 50.1959 17.1056C50.2935 17.2078 51.0022 18.0073 51.1306 17.843C51.9368 16.8214 49.0199 15.7242 49.4924 14.516C49.5592 14.6448 50.9097 17.0435 51.2692 16.4527C51.2743 16.1107 51.187 15.8086 51.0433 15.5421C51.7006 16.0529 50.7351 14.7337 50.35 14.1962C50.4989 14.3472 50.6632 14.3606 50.8532 14.2318C50.8122 13.6543 50.5297 13.2457 49.9905 13.0147C50.1805 12.9703 48.8453 7.99093 48.5424 6.24083C48.7529 7.43125 45.6512 12.3884 46.4318 12.0908C45.7796 13.0458 45.985 13.7476 44.9785 14.445C45.8309 13.8675 44.0336 17.4788 45.7898 15.5199C45.6204 15.8575 44.3212 18.8335 44.4085 18.8024C44.6549 18.3805 44.8604 18.3005 45.0247 18.5226C44.4649 19.1 42.5495 21.2144 45.0709 18.9357C44.809 19.3532 43.5149 21.7119 43.3711 21.7963C43.6536 21.623 43.7665 21.8584 44.049 21.6985C43.7203 21.9873 41.0808 25.3986 44.5112 22.1294C44.1671 22.5736 42.0976 25.4119 42 25.4075C42.6008 25.4208 43.3763 24.9145 43.7922 24.528C43.3917 25.0788 42.2362 26.4469 42.38 26.3803Z"
          fill="#0c1235"
        />
      </svg>

      {/* Stars — starts off-screen right, slides into view when checked */}
      <svg
        aria-hidden
        className="props absolute -right-[45px] -top-[3px] z-[99] w-[40px] peer-checked:-translate-x-16"
        xmlns="http://www.w3.org/2000/svg"
        width="85"
        height="26"
        viewBox="0 0 85 26"
        fill="none"
      >
        <g>
          <circle cx="30.5" cy="18.5" r="0.5" fill="white" />
          <circle cx="46.5" cy="1.5" r="0.5" fill="white" />
          <circle cx="8.5" cy="23.5" r="0.5" fill="white" />
          <circle cx="69.5" cy="3.5" r="0.5" fill="white" />
          <circle cx="69.5" cy="20.5" r="0.5" fill="white" />
          <circle cx="60.5" cy="9.5" r="0.5" fill="white" />
          <circle cx="82.5" cy="19.5" r="0.5" fill="white" />
          <circle cx="22.5" cy="6.5" r="0.5" fill="white" />
          <circle cx="1.5" cy="10.5" r="0.5" fill="white" />
          <circle cx="34.5" cy="7.5" r="0.5" fill="white" />
          <circle cx="15.5" cy="13.5" r="0.5" fill="white" />
        </g>
      </svg>
    </label>
  );
}

function BrandLogo() {
  return (
    <a
      href="#top"
      aria-label="Anirudh Makuluri — home"
      className="group inline-flex items-center gap-2.5"
    >
      <span
        aria-hidden
        className="relative inline-flex h-7 items-center justify-center overflow-hidden rounded-[8px] bg-slate-950 px-2.5 text-[#f6f5f1] transition-[border-radius] duration-500 ease-out group-hover:rounded-full dark:bg-white dark:text-[#0a0a0a]"
      >
        {/* Angular "MAR" monogram — letters as crisp constructed strokes */}
        <svg
          viewBox="0 0 36 14"
          className="h-3.5 w-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          {/* M */}
          <path d="M1 13 V1 L5 7 L9 1 V13" />
          {/* A */}
          <path d="M13 13 L17 1 L21 13 M14.5 9 H19.5" />
          {/* R */}
          <path d="M25 13 V1 H30 L33 4 L30 7 H25 M29 7 L33 13" />
        </svg>
        <span
          aria-hidden
          className="absolute -bottom-[1px] -right-[1px] h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2 ring-[#f6f5f1] dark:ring-[#0a0a0a]"
        />
      </span>
      {/* <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500 transition-colors duration-300 group-hover:text-slate-950 dark:text-slate-500 dark:group-hover:text-white">
        anirudh
      </span> */}
    </a>
  );
}

function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`group/link inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors duration-300 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white ${className}`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
      </span>
      <BsArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500 dark:text-slate-500">
      <span className="tabular-nums">{index}</span>
      <span className="h-px flex-1 bg-slate-950/15 dark:bg-white/15" />
      <span>{label}</span>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectRow({
  title,
  description,
  tags,
  liveLink,
  githubLink,
}: {
  title: string;
  description: string;
  tags: readonly string[];
  liveLink: string | null;
  githubLink: string | null;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative grid gap-6 py-8 transition-colors duration-500 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-12"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-[-1.25rem] inset-y-0 -z-10 rounded-2xl bg-slate-950/[0.025] opacity-0 transition-opacity duration-500 dark:bg-white/[0.025] ${
          hovered ? "opacity-100" : ""
        }`}
      />
      <div className="space-y-3">
        <h3 className="flex items-center gap-3 text-xl font-medium text-slate-950 transition-transform duration-500 group-hover:translate-x-1 dark:text-white">
          {title}
          {liveLink && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400">
              live
            </span>
          )}
        </h3>
        <p className="max-w-2xl text-[15px] leading-7 text-slate-600 dark:text-slate-400">
          {description}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500">
          {tags.slice(0, 6).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          {tags.length > 6 && <span>+{tags.length - 6}</span>}
        </div>
      </div>
      <div className="flex items-start gap-5 sm:flex-col sm:items-end sm:gap-3">
        {liveLink && <ArrowLink href={liveLink}>Live</ArrowLink>}
        {githubLink && <ArrowLink href={githubLink}>Code</ArrowLink>}
      </div>
    </article>
  );
}

function WorkRow({
  role,
  company,
  period,
  location,
  summary,
  highlights,
  stack,
}: (typeof workExperienceData)[number]) {
  return (
    <article className="grid gap-4 py-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
      <div className="space-y-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-500">
          {period}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500">{location}</p>
      </div>
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-medium text-slate-950 dark:text-white">
            {role}{" "}
            <span className="text-slate-400 dark:text-slate-600">·</span>{" "}
            <span className="text-slate-600 dark:text-slate-400">{company}</span>
          </h3>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          {summary}
        </p>
        <ul className="space-y-1.5 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden className="mt-2.5 inline-block h-px w-3 flex-shrink-0 bg-slate-950/25 dark:bg-white/25" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500">
          {stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function EducationRow({
  degree,
  school,
  period,
  location,
  summary,
  focus,
}: (typeof educationData)[number]) {
  return (
    <article className="grid gap-4 py-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
      <div className="space-y-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-500">
          {period}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500">{location}</p>
      </div>
      <div className="space-y-3">
        <h3 className="text-base font-medium text-slate-950 dark:text-white">
          {degree}{" "}
          <span className="text-slate-400 dark:text-slate-600">·</span>{" "}
          <span className="text-slate-600 dark:text-slate-400">{school}</span>
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          {summary}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500">
          {focus.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function RecommendationCard({
  name,
  role,
  relation,
  avatar,
  quote,
}: (typeof recommendationsData)[number]) {
  return (
    <figure className="group relative grid gap-5 py-7 sm:grid-cols-[auto_1fr] sm:gap-7">
      <div className="flex items-start gap-3 sm:flex-col sm:items-center sm:gap-2">
        <span className="relative inline-flex h-10 w-10 overflow-hidden rounded-full ring-1 ring-slate-950/15 transition-transform duration-500 group-hover:scale-105 sm:h-12 sm:w-12 dark:ring-white/15">
          <Image
            src={avatar}
            alt={`${name} avatar`}
            fill
            sizes="48px"
            className="object-cover"
          />
        </span>
        <div className="sm:hidden">
          <p className="text-sm font-medium text-slate-950 dark:text-white">{name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-500">{role}</p>
        </div>
      </div>

      <div className="relative space-y-4">
        <span
          aria-hidden
          className="absolute -left-2 -top-4 select-none font-serif text-[3.5rem] leading-none text-slate-950/[0.08] transition-colors duration-500 group-hover:text-slate-950/15 dark:text-white/[0.07] dark:group-hover:text-white/15 sm:-left-3 sm:-top-6 sm:text-[5rem]"
        >
          “
        </span>

        <blockquote className="relative max-w-2xl text-[15px] leading-7 text-slate-700 dark:text-slate-300">
          {quote}
        </blockquote>

        <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1">
          <span className="hidden text-sm font-medium text-slate-950 sm:inline dark:text-white">
            {name}
          </span>
          <span className="hidden text-slate-400 sm:inline dark:text-slate-600">·</span>
          <span className="hidden text-sm text-slate-600 sm:inline dark:text-slate-400">
            {role}
          </span>
		  <br />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-500">
            {relation}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

export default function HomePageV2() {
  const reduceMotion = useReducedMotion();

  const projects = useMemo(() => projectsData, []);

  return (
    <main className="relative min-h-dvh bg-[#f6f5f1] text-slate-950 selection:bg-slate-950 selection:text-[#f6f5f1] dark:bg-[#0a0a0a] dark:text-slate-100 dark:selection:bg-white dark:selection:text-slate-950">
      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:80px_100%] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)]"
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-24 px-6 py-8 sm:px-10 sm:py-10">
        {/* HEADER */}
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-between"
        >
          <BrandLogo />
          <div className="flex items-center gap-5">
            {/* <a
              href={`mailto:${EMAIL}`}
              className="hidden text-sm text-slate-600 transition-colors duration-300 hover:text-slate-950 sm:inline-flex dark:text-slate-400 dark:hover:text-white"
            >
              {EMAIL}
            </a> */}
            <ThemeToggle />
          </div>
        </motion.header>

        {/* HERO */}
        <section id="top" className="pt-12 sm:pt-20">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500 dark:text-slate-500"
          >
            Full-Stack Engineer · AI Builder · DevOps Engineer
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-[2.5rem] font-medium leading-[1.05] tracking-[-0.02em] text-slate-950 dark:text-white sm:text-[3.5rem]"
          >
            Anirudh Makuluri
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-[17px] leading-8 text-slate-700 dark:text-slate-300"
          >
            I build the{" "}
            <span className="relative inline-block font-medium text-slate-950 dark:text-white">
              unglamorous middle layer
              <span aria-hidden className="absolute inset-x-0 bottom-0.5 -z-10 h-2 bg-emerald-400/30 dark:bg-emerald-400/25" />
            </span>{" "}
            between AI ideas and apps people actually ship —{" "}
            <span className="text-slate-950 dark:text-white">deployment automation</span>,{" "}
            <span className="text-slate-950 dark:text-white">repo intelligence</span>, and{" "}
            <span className="text-slate-950 dark:text-white">real-time systems</span>.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <LiveLocation />
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
          >
            <ArrowLink href={`mailto:${EMAIL}`}>Email</ArrowLink>
            <ArrowLink href={GITHUB}>
              <span className="inline-flex items-center gap-1.5">
                <BsGithub className="h-3.5 w-3.5" />
                GitHub
              </span>
            </ArrowLink>
            <ArrowLink href={LINKEDIN}>
              <span className="inline-flex items-center gap-1.5">
                <BsLinkedin className="h-3.5 w-3.5" />
                LinkedIn
              </span>
            </ArrowLink>
            <ArrowLink href={RESUME}>Résumé</ArrowLink>
          </motion.div>
        </section>

        {/* CURRENTLY */}
        <Reveal className="space-y-6">
          <SectionLabel index="01" label="Currently" />
          <ul className="space-y-3 text-[15px] leading-7 text-slate-700 dark:text-slate-300">
            {NOW_DOING.map((item, i) => (
              <li key={item} className="flex gap-4">
                <span className="font-mono text-[11px] tabular-nums text-slate-400 dark:text-slate-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* SELECTED WORK (Projects) */}
        <Reveal className="space-y-2">
          <SectionLabel index="02" label="Selected Work" />
          <div className="divide-y divide-slate-950/[0.08] dark:divide-white/[0.08]">
            {projects.map((p) => (
              <ProjectRow
                key={p.title}
                title={p.title}
                description={p.description}
                tags={p.tags}
                liveLink={p.liveLink}
                githubLink={p.githubLink}
              />
            ))}
          </div>
        </Reveal>

        {/* EXPERIENCE */}
        <Reveal className="space-y-2">
          <SectionLabel index="03" label="Experience" />
          <div className="divide-y divide-slate-950/[0.08] dark:divide-white/[0.08]">
            {workExperienceData.map((w) => (
              <WorkRow key={`${w.role}-${w.period}`} {...w} />
            ))}
          </div>
        </Reveal>

        {/* RECOMMENDATIONS */}
        <Reveal className="space-y-2">
          <SectionLabel index="04" label="Kind Words" />
          <div className="divide-y divide-slate-950/[0.08] dark:divide-white/[0.08]">
            {recommendationsData.map((r) => (
              <RecommendationCard key={r.name} {...r} />
            ))}
          </div>
        </Reveal>

        {/* EDUCATION */}
        <Reveal className="space-y-2">
          <SectionLabel index="05" label="Education" />
          <div className="divide-y divide-slate-950/[0.08] dark:divide-white/[0.08]">
            {educationData.map((e) => (
              <EducationRow key={`${e.degree}-${e.school}`} {...e} />
            ))}
          </div>
        </Reveal>

        {/* STACK */}
        <Reveal className="space-y-6">
          <SectionLabel index="06" label="Stack" />
          <div className="grid gap-8 sm:grid-cols-2">
            {Object.entries(categorizedSkills).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-500">
                  {category}
                </p>
                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                  {items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CERTIFICATIONS */}
        <Reveal className="space-y-6">
          <SectionLabel index="07" label="Certifications" />
          <ul className="space-y-4">
            {certificatesData.map((c) => (
              <li
                key={c.name}
                className="group grid gap-2 border-b border-slate-950/[0.08] pb-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:gap-6 dark:border-white/[0.08]"
              >
                <div>
                  <a
                    href={c.link}
                    target={c.link.startsWith("http") ? "_blank" : undefined}
                    rel={c.link.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-block text-[15px] font-medium text-slate-950 transition-colors duration-300 hover:text-slate-700 dark:text-white dark:hover:text-slate-300"
                  >
                    {c.name}
                  </a>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                    {c.issuedBy}
                  </p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 sm:self-center dark:text-slate-500">
                  {c.date}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* CONTACT */}
        <Reveal className="space-y-6 pt-4">
          <SectionLabel index="08" label="Contact" />
          <div className="space-y-4">
            <h2 className="text-[1.75rem] font-medium leading-tight tracking-[-0.01em] text-slate-950 dark:text-white sm:text-[2.25rem]">
              Have an idea worth building?
            </h2>
            <p className="max-w-xl text-[15px] leading-7 text-slate-600 dark:text-slate-400">
              I'm open to roles, collaborations, and the occasional weird side project.
              The fastest way to reach me is{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="font-medium text-slate-950 underline decoration-slate-950/30 underline-offset-4 transition-colors duration-300 hover:decoration-slate-950 dark:text-white dark:decoration-white/30 dark:hover:decoration-white"
              >
                {EMAIL}
              </a>
              .
            </p>
          </div>
        </Reveal>

        {/* FOOTER */}
        <footer className="flex flex-col gap-3 border-t border-slate-950/[0.08] pb-8 pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:border-white/[0.08] dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Anirudh Raghavendra Makuluri</p>
          <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
        </footer>
      </div>
    </main>
  );
}
