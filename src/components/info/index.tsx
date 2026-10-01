// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useRef } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import { useDisabled } from "@/utils/hooks";
import { Tooltip, useTooltip } from "../tooltip";

type TooltipProps = {
  children?: React.ReactNode;
};

export function Info(props: Readonly<TooltipProps>) {
  const { children } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { tooltipId, tooltipRef } = useTooltip(buttonRef);
  const disabled = useDisabled();

  return (
    <button
      className="cursor-help"
      ref={buttonRef}
      aria-labelledby={tooltipId}
      type="button"
      popoverTarget={tooltipId}
      popoverTargetAction="toggle"
      disabled={disabled}
    >
      <QuestionMarkCircleIcon className="size-4" />
      <Tooltip
        tooltipId={tooltipId}
        tooltipRef={tooltipRef}
        positionArea="right"
      >
        {children}
      </Tooltip>
    </button>
  );
}
