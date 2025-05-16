// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Tab as HeadlessUITab } from "@headlessui/react";

export type TabProps = {
  children?: React.ReactNode;
};

export default function Tab(props: Readonly<TabProps>) {
  const { children, ...other } = props;
  return (
    <HeadlessUITab
      {...other}
      className="data-[selected]:text-primary data-[selected]:border-primary dark:data-[selected]:border-secondary dark:data-[selected]:text-secondary hover:border-primary dark:hover:border-secondary hover:text-shadow grow cursor-pointer border-b-2 border-gray-400 px-3 py-1 text-base tracking-wide text-gray-400 outline-hidden hover:text-shadow-white/30 data-[selected]:border-b-2 data-[selected]:font-bold"
    >
      <small>{children}</small>
    </HeadlessUITab>
  );
}
