// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabGroup as HeadlessTabList, TabGroupProps } from "@headlessui/react";

export function TabGroup(props: Readonly<TabGroupProps>) {
  return <HeadlessTabList {...props} />;
}
