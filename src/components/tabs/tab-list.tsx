// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Children, ReactElement } from "react";
import { TabProps } from "./tab";
import { TabIndexContext } from "./context";

export type TabListProps = {
  children: (ReactElement<TabProps> | boolean | null)[];
  className?: string;
};

export function TabList(props: Readonly<TabListProps>) {
  const tabs = Children.toArray(props.children);
  return (
    <div role="tablist" className={props.className}>
      {tabs.map((child, index) => (
        <TabIndexContext value={index} key={index}>
          {child}
        </TabIndexContext>
      ))}
    </div>
  );
}
