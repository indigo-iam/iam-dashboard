// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId, useRef } from "react";
import { useTabActions, useTabData, useTabIndex } from "./context";
import { Button } from "../buttons";

export type TabProps = {
  children: React.ReactNode;
};

export function Tab(props: Readonly<TabProps>) {
  const { children } = props;
  const tabId = `tab${useId()}`;
  const tabRef = useRef(null);
  const { selectedIndex, panels } = useTabData();
  const actions = useTabActions();
  const index = useTabIndex();
  const selected = selectedIndex === index;
  const tabPanelId = panels[selectedIndex]?.current?.id;

  function select() {
    actions.selectTab(index || 0);
  }

  return (
    <Button
      role="tab"
      id={tabId}
      ref={tabRef}
      tabIndex={0}
      variant="plain"
      className="text-gray min-w-fit grow cursor-pointer overflow-hidden border-b-2 border-gray-300 p-2 text-center text-sm tracking-wide -outline-offset-2 hover:border-sky-500 hover:text-sky-500 focus:not-data-focus:outline-none data-selected:border-sky-600 data-selected:font-bold data-selected:text-sky-500 dark:border-gray-600 dark:text-gray-400 dark:hover:border-blue-300 dark:hover:text-blue-300 dark:data-selected:border-sky-400 dark:data-selected:text-sky-500"
      onClick={select}
      aria-selected={selected}
      aria-controls={tabPanelId}
    >
      {children}
    </Button>
  );
}
