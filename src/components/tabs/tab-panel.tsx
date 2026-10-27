// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Children, ReactElement, useId, useEffect, useRef } from "react";
import {
  TabIndexContext,
  useTabActions,
  useTabData,
  useTabIndex,
} from "./context";

export type TabPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function TabPanel(props: Readonly<TabPanelProps>) {
  const { children, className } = props;
  const { selectedIndex } = useTabData();
  const tabIndex = useTabIndex();
  const actions = useTabActions();
  const selected = selectedIndex === tabIndex;
  const panelId = `tab-panel${useId()}`;
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (panel !== null) {
      actions.registerPanel(panelRef);
    }
    return () => {
      if (panel !== null) {
        actions.unregisterPanel(panelRef);
      }
    };
  }, [actions, panelRef]);

  return (
    <div
      className={`hidden data-selected:block ${className}`}
      tabIndex={-1}
      id={panelId}
      ref={panelRef}
      data-selected={selected || null}
      data-tab-index={tabIndex}
    >
      {children}
    </div>
  );
}

export type TabPanelsProps = {
  className?: string;
  children: (ReactElement<TabPanelProps> | boolean | null)[];
};

export function TabPanels(props: Readonly<TabPanelsProps>) {
  const panels = Children.toArray(props.children);
  return (
    <div className={props.className}>
      {panels.map((child, index) => (
        <TabIndexContext value={index} key={`tab-panel-index-${index}`}>
          {child}
        </TabIndexContext>
      ))}
    </div>
  );
}
