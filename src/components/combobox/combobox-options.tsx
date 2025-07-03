// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ComboboxOptions as HeadlessComboboxOptions } from "@headlessui/react";

type ComboboxOptionsProps = {
  children?: React.ReactNode;
};

export function ComboboxOptions(props: Readonly<ComboboxOptionsProps>) {
  const { children } = props;
  return (
    <HeadlessComboboxOptions
      className="bg-secondary z-50 w-(--input-width) rounded-lg p-2 shadow dark:bg-white/10 dark:backdrop-blur-md"
      anchor="bottom"
    >
      {children}
    </HeadlessComboboxOptions>
  );
}
