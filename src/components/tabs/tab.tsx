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
    <HeadlessUITab className="dark:text-light-gray/80 text-gray min-w-fit grow cursor-pointer overflow-hidden border-b-2 border-gray-400 p-2 text-sm tracking-wide -outline-offset-2 hover:border-sky-500 hover:text-sky-500 focus:not-data-focus:outline-none data-[selected]:border-sky-600 data-[selected]:font-bold data-[selected]:text-sky-500 dark:hover:border-blue-300 dark:hover:text-blue-300 dark:data-[selected]:border-sky-400 dark:data-[selected]:text-sky-500">
      {children}
    </HeadlessUITab>
  );
}
