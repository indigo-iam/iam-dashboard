// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Tab as HeadlessUITab } from "@headlessui/react";

export type TabProps = {
  children?: React.ReactNode;
};

export default function Tab(props: Readonly<TabProps>) {
  const { children } = props;
  return (
    <HeadlessUITab className="data-[selected]:text-primary data-[selected]:border-primary dark:data-[selected]:border-secondary dark:data-[selected]:text-secondary hover:border-primary dark:hover:border-secondary hover:text-shadow min-w-fit grow cursor-pointer overflow-hidden border-b-2 border-gray-400 p-2 text-sm tracking-wide text-gray-400 -outline-offset-2 hover:text-shadow-white/30 focus:not-data-focus:outline-none data-[selected]:border-b-2 data-[selected]:font-bold">
      {children}
    </HeadlessUITab>
  );
}
