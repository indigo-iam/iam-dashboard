// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { useId, useRef } from "react";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Tooltip, useTooltip } from "../tooltip";

type OptionProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  "data-danger"?: boolean;
  "data-testid"?: string;
};

export function Option(props: Readonly<OptionProps>) {
  const { children, ...other } = props;
  return (
    <button
      type="button"
      className="hover:not:dark:text-gray-500 data-danger:text-danger dark:data-danger:text-danger-light btn-popover px-2 py-1.5 text-start text-base whitespace-nowrap dark:text-gray-200"
      {...other}
    >
      {children}
    </button>
  );
}

type OptionsProps = {
  children?: React.ReactNode;
};

export function Options(props: Readonly<OptionsProps>) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { tooltipId, tooltipRef } = useTooltip(buttonRef);
  const popoverId = useId();
  const { children } = props;
  return (
    <div>
      <button
        data-testid="option"
        className="group relative my-auto cursor-pointer rounded-md transition hover:bg-gray-200 data-open:bg-gray-200 dark:hover:bg-gray-500 dark:data-active:bg-gray-200 dark:data-open:bg-gray-500"
        aria-labelledby={tooltipId}
        popoverTarget={popoverId}
        popoverTargetAction="toggle"
        ref={buttonRef}
      >
        <EllipsisHorizontalIcon className="size-8 text-gray-800 dark:text-gray-400" />
        <Tooltip tooltipId={tooltipId} tooltipRef={tooltipRef}>
          More
        </Tooltip>
      </button>
      <div
        id={popoverId}
        popover="auto"
        className="easy-out overlay absolute inset-auto m-0 p-2 opacity-0 transition-opacity [&:popover-open]:opacity-100 [&:popover-open]:starting:opacity-0"
        style={{
          positionArea: "block-end center",
          transitionProperty: "display, opacity, overlay",
        }}
      >
        {children}
      </div>
    </div>
  );
}
