// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { ComboboxInput as HeadlessComboboxInput } from "@headlessui/react";
import { useRef } from "react";

type ComboboxInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ComboboxInput(props: Readonly<ComboboxInputProps>) {
  const { onChange } = props;
  const timeoutRef = useRef<number>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      onChange(event);
    }, 150);
  };

  return (
    <HeadlessComboboxInput
      className="iam-input"
      placeholder="Type to search..."
      type="search"
      onChange={handleChange}
    />
  );
}
