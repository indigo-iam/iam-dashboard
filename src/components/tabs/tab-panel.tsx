// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel as HeadlessUITabPanel } from "@headlessui/react";

type TapPanelProps = {
  children: React.ReactNode;
  className?: string;
  unmount?: boolean;
};

export default function TabPanel(props: Readonly<TapPanelProps>) {
  const { children, className, unmount } = props;
  return (
    <HeadlessUITabPanel unmount={unmount} className={className}>
      {children}
    </HeadlessUITabPanel>
  );
}
