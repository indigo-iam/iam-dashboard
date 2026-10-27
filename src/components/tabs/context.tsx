// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { createContext, RefObject, useContext } from "react";

export type RefPanel = RefObject<HTMLElement | null>;
export type RefTab = RefObject<HTMLElement | null>;

export type TabDataContextProps = {
  panels: RefPanel[];
  selectedIndex: number;
};

export const TabDataContext = createContext<TabDataContextProps | null>(null);

export function useTabData() {
  const context = useContext(TabDataContext);
  if (!context) {
    throw new Error("Use this component as child of <TabGroup> component.");
  }
  return context;
}

type TabActionsContextProps = {
  registerPanel: (_: RefPanel) => void;
  unregisterPanel: (_: RefPanel) => void;
  selectTab: (_: number) => void;
  previousTab: () => void;
  nextTab: () => void;
};

export const TabActionsContext = createContext<TabActionsContextProps | null>(
  null
);

export function useTabActions() {
  const context = useContext(TabActionsContext);
  if (!context) {
    throw new Error("Use this component as child of <TabGroup> component.");
  }
  return context;
}

export const TabIndexContext = createContext<number | null>(null);

export function useTabIndex() {
  const index = useContext(TabIndexContext);
  if (index === null) {
    throw new Error("Use this component as child of <TabList> component.");
  }
  return index;
}
