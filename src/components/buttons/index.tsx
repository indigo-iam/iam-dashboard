// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { RefObject, useRef } from "react";

import { useDisabled } from "@/utils/hooks";
import { Tooltip, useTooltip } from "../tooltip";

const classNames = {
  base: "flex max-h-fit max-w-fit min-w-fit cursor-pointer items-center gap-1 rounded-md p-1 px-2 text-sm font-normal text-nowrap transition ease-out disabled:cursor-not-allowed",
  primary: {
    solid:
      "border bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-800 disabled:border-gray-200 disabled:bg-gray-300 disabled:text-gray-500 dark:border-none dark:border-gray-300 dark:bg-sky-600 dark:text-white dark:hover:bg-gray-400 dark:disabled:bg-sky-600/30 dark:disabled:text-white/40",
    outline:
      "border border-gray-200 bg-gray-100 text-gray-950 hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:active:bg-sky-700 dark:disabled:bg-gray-800 dark:disabled:text-gray-500",
    underline:
      " text-gray-950 hover:underline active:font-bold active:tracking-tight disabled:text-gray-300 dark:text-white dark:disabled:text-gray-500",
  },
  danger: {
    solid:
      " bg-danger disabled:bg-danger/50 border-none text-white hover:bg-red-500 active:bg-red-800",
    outline:
      "hover:bg-danger hover:border-danger dark:hover:bg-danger border border-gray-200 bg-gray-100 text-gray-950 hover:text-white active:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:disabled:bg-gray-800 dark:disabled:text-gray-500",
    underline:
      "hover:text-danger text-gray-950 hover:underline active:font-bold active:tracking-tight dark:text-white",
  },
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: RefObject<HTMLButtonElement | null>;
  accent?: "primary" | "danger";
  variant?: "solid" | "outline" | "underline" | "plain";
};

export function Button(props: Readonly<ButtonProps>) {
  const {
    disabled,
    name,
    accent = "primary",
    variant = "solid",
    className,
    children,
    ...others
  } = props;
  // https://github.com/vercel/next.js/issues/35558
  const extraProps = { autoComplete: "off" };
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { tooltipId, tooltipRef } = useTooltip(buttonRef);
  const isDisabled = useDisabled() || disabled;
  const cls =
    variant === "plain"
      ? className
      : [className, classNames["base"], classNames[accent][variant]].join(" ");
  return (
    <button
      className={cls}
      {...others}
      {...extraProps}
      disabled={isDisabled}
      aria-labelledby={tooltipId}
      aria-describedby={tooltipId}
      ref={buttonRef}
    >
      {children}
      {name && (
        <Tooltip tooltipId={tooltipId} tooltipRef={tooltipRef}>
          {name}
        </Tooltip>
      )}
    </button>
  );
}
