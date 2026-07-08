// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useDisabled } from "@/utils/hooks";
import { Button as HeadlessButton, ButtonProps } from "@headlessui/react";

export function Button(props: Readonly<ButtonProps>) {
  const disabled = useDisabled();

  return <HeadlessButton {...props} disabled={disabled || props.disabled} />;
}
