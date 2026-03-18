// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  ListboxOptions as HeadlessListboxOptions,
  ListboxOptionsProps,
} from "@headlessui/react";

export default function ListboxOptions(props: Readonly<ListboxOptionsProps>) {
  return (
    <HeadlessListboxOptions
      {...props}
      anchor="bottom start"
      className="overlay z-10 mt-2 w-(--input-width)"
    />
  );
}
