// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabList as HeadlessUITabList } from "@headlessui/react";

export type TabListProps = {
  children?: React.ReactNode;
};

export default function TabList(props: Readonly<TabListProps>) {
  return (
    <HeadlessUITabList className="flex">{props.children}</HeadlessUITabList>
  );
}
