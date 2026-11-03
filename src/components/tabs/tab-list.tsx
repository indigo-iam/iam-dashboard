// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Children, ReactElement } from "react";

import { TabProps } from "./tab";
import { TabIndexContext } from "./context";

export type TabListProps = React.HTMLAttributes<HTMLElement> & {
  children: (ReactElement<TabProps> | boolean)[];
  className?: string;
};

export function TabList(props: Readonly<TabListProps>) {
  return (
    <div role="tablist" {...props}>
      {Children.map(props.children, (child, index) => (
        <TabIndexContext value={index}>{child}</TabIndexContext>
      ))}
    </div>
  );
}
