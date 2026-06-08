// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel as HeadlessUITabPanel } from "@headlessui/react";

type TapPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function TabPanel(props: Readonly<TapPanelProps>) {
  const { children, className } = props;
  return (
    <HeadlessUITabPanel unmount={false} className={className} tabIndex={-1}>
      {children}
    </HeadlessUITabPanel>
  );
}
