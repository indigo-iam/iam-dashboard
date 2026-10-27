// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { ReactElement } from "react";
import { TabProps } from "./tab";
import { TabIndexContext } from "./context";

export type TabListProps = React.HTMLAttributes<HTMLElement> & {
  children: (ReactElement<TabProps> | boolean)[];
  className?: string;
};

export function TabList(props: Readonly<TabListProps>) {
  return (
    <div role="tablist" {...props}>
      {props.children.map((child, index) =>
        typeof child === "object" ? (
          <TabIndexContext
            value={index}
            key={`tab-index_${child.props?.children || index}`}
          >
            {child}
          </TabIndexContext>
        ) : null
      )}
    </div>
  );
}
