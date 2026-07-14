// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

type TooltipProps = {
  children?: React.ReactNode;
  anchor?: "top" | "bottom" | "left" | "right";
};

export function Info(props: Readonly<TooltipProps>) {
  const { children, anchor } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const id = useId();
  return (
    <div className="flex items-center">
      <button
        className="group relative cursor-help"
        aria-describedby={id}
        onClick={open}
      >
        <QuestionMarkCircleIcon className="size-4" />
        <div
          id={id}
          role="tooltip"
          className="tooltip absolute z-30 w-lg delay-300 data-[anchor='left']:translate-x-0 data-[anchor='right']:translate-x-100 data-[show='true']:block data-[show='true']:opacity-100 data-[show='true']:starting:opacity-0"
          data-anchor={anchor}
          data-show={show}
        >
          <div className="relative">{children}</div>
        </div>
      </button>
      <button
        className="fixed inset-0 z-20 bg-transparent"
        onClick={close}
        hidden={!show}
      />
    </div>
  );
}
