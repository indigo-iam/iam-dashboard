// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useLoading } from "./context";

export function ProgressBar() {
  const { progress, isProgressBarHidden } = useLoading();
  const progressPercentage = `${Math.round(progress * 100)}%`;
  return (
    <div
      id="progress-bar"
      className="fixed inset-0 top-0 z-20 h-1.5 w-full bg-transparent opacity-0 data-[show='true']:opacity-100"
      data-show={!isProgressBarHidden}
    >
      <div
        className="easy-in h-full bg-blue-600"
        style={{ width: progressPercentage, transition: "width 0.3s ease" }}
      />
    </div>
  );
}
