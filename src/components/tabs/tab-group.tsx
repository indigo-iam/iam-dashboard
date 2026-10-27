// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { ReactElement, useCallback, useMemo, useReducer, useRef } from "react";
import { RefPanel, RefTab, TabDataContext, TabActionsContext } from "./context";
import { TabListProps } from "./tab-list";
import { TabPanelsProps } from "./tab-panel";

type TabGroupState = {
  selectedIndex: number;
  panels: RefPanel[];
  tabs: RefTab[];
};

type TabAction =
  | { type: "REGISTER_PANEL"; panel: RefPanel }
  | { type: "UNREGISTER_PANEL"; panel: RefPanel }
  | { type: "SELECT_TAB"; index: number };

const DefaultTabGroupState: TabGroupState = {
  selectedIndex: 0,
  panels: [],
  tabs: [],
};

function reducer(
  currentState: TabGroupState,
  action: TabAction
): TabGroupState {
  switch (action.type) {
    case "REGISTER_PANEL": {
      if (currentState.panels.includes(action.panel)) {
        return currentState;
      }
      const panels = [...currentState.panels];
      panels.push(action.panel);
      return {
        ...currentState,
        panels,
      };
    }
    case "UNREGISTER_PANEL": {
      return {
        ...currentState,
        panels: currentState.panels.filter(p => p != action.panel),
      };
    }
    case "SELECT_TAB":
      return {
        ...currentState,
        selectedIndex: action.index,
      };
  }
}

type TabGroupProps = {
  children: [ReactElement<TabListProps>, ReactElement<TabPanelsProps>];
  className?: string;
};

export function TabGroup(props: Readonly<TabGroupProps>) {
  const [state, dispatch] = useReducer(reducer, DefaultTabGroupState);
  const groupRef = useRef<HTMLDivElement | null>(null);

  const registerPanel = useCallback(
    (panel: RefPanel) => dispatch({ type: "REGISTER_PANEL", panel }),
    []
  );

  const unregisterPanel = useCallback(
    (panel: RefPanel) => dispatch({ type: "UNREGISTER_PANEL", panel }),
    []
  );

  const selectTab = useCallback(
    (index: number) => dispatch({ type: "SELECT_TAB", index }),
    []
  );

  const actions = useMemo(() => {
    return {
      registerPanel,
      unregisterPanel,

      selectTab,
    };
  }, [registerPanel, selectTab, unregisterPanel]);

  return (
    <TabActionsContext value={actions}>
      <TabDataContext value={state}>
        <div ref={groupRef} {...props} />
      </TabDataContext>
    </TabActionsContext>
  );
}
