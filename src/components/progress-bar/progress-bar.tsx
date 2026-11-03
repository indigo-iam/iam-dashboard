// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect, useRef } from "react";
import { useProgressBar } from "./context";

export function ProgressBar() {
  const { progress, isProgressBarHidden } = useProgressBar();
  const barRef = useRef<HTMLDivElement>(null);
  const progressPercentage = `${Math.round(progress * 100)}%`;

  // The dynamic width is applied through the CSSOM instead of an inline
  // `style` attribute: inline style attributes are blocked by the strict
  // `style-src` CSP (they cannot carry the nonce), whereas runtime CSSOM
  // changes are allowed.
  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = progressPercentage;
    }
  }, [progressPercentage]);

  return (
    <div
      id="progress-bar"
      className="z-20 h-1.5 w-full bg-transparent opacity-0 data-[show='true']:opacity-100"
      data-show={!isProgressBarHidden}
    >
      <div ref={barRef} className="h-full w-0 bg-blue-600" />
    </div>
  );
}
