// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { RefObject, useEffect, useId, useRef } from "react";

type TooltipProps = {
  tooltipId: string;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
  positionArea?: string;
  children?: React.ReactNode;
};

export function Tooltip(props: Readonly<TooltipProps>) {
  const { tooltipId, tooltipRef, positionArea, children } = props;
  return (
    <div
      role="tooltip"
      popover="hint"
      id={tooltipId}
      ref={tooltipRef}
      className="pointer-events-none inset-auto max-w-52 rounded-md border border-gray-700 bg-gray-900 p-2 text-xs text-white opacity-0 transition-opacity delay-500 duration-300 ease-in-out [&:popover-open]:opacity-100 [&:popover-open]:starting:opacity-0"
      style={{
        positionArea: positionArea ?? "block-end center",
        transitionProperty: "display, opacity",
      }}
    >
      {children}
    </div>
  );
}

export function useTooltip(buttonRef: RefObject<HTMLButtonElement | null>) {
  const tooltipId = useId();
  const tooltipRef = useRef<HTMLDivElement>(null);

  function showTooltip() {
    const source = buttonRef.current ?? undefined;
    tooltipRef.current?.showPopover({ source });
  }

  function hideTooltip() {
    tooltipRef.current?.hidePopover();
  }

  useEffect(() => {
    if (!buttonRef.current) {
      return;
    }
    const button = buttonRef.current;
    button.addEventListener("mouseover", showTooltip);
    button.addEventListener("mouseout", hideTooltip);
    button.addEventListener("focus", showTooltip);
    button.addEventListener("blur", hideTooltip);
    return () => {
      button.removeEventListener("mouseover", showTooltip);
      button.removeEventListener("mouseout", hideTooltip);
      button.removeEventListener("focus", showTooltip);
      button.removeEventListener("blur", hideTooltip);
    };
  });
  return {
    tooltipId,
    tooltipRef,
    showTooltip,
    hideTooltip,
  };
}
