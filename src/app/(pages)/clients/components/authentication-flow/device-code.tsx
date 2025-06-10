// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect } from "react";

type DeviceCodeProps = {
  onStatusChange?: (status: boolean) => void;
};

export default function DeviceCode(props: Readonly<DeviceCodeProps>) {
  const { onStatusChange } = props;
  useEffect(() => onStatusChange?.(true), [onStatusChange]);

  return null;
}
