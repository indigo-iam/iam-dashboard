// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId } from "react";

import { useDisabled } from "@/utils/hooks";
import { Button as HeadlessButton, ButtonProps } from "@headlessui/react";

export function Button(props: Readonly<ButtonProps>) {
  const { disabled, name, children, ...others } = props;
  const tooltipId = useId();
  const isDisabled = useDisabled() || disabled;
  const extraProps = {
    autoComplete: "off", // https://github.com/vercel/next.js/issues/35558
  };
  if (name) {
    return (
      <HeadlessButton
        {...others}
        {...extraProps}
        disabled={isDisabled}
        aria-describedby={tooltipId}
      >
        <>{children}</>
        <div role="tooltip" id={tooltipId} className="tooltip">
          {name}
        </div>
      </HeadlessButton>
    );
  }

  return (
    <HeadlessButton {...others} {...extraProps} disabled={isDisabled}>
      {children}
    </HeadlessButton>
  );
}
