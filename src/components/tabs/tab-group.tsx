// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { RefPanel, TabDataContext, TabActionsContext } from "./context";
import { TabListProps } from "./tab-list";
import { TabPanelsProps } from "./tab-panel";
import { initialTabGroupState, reducer } from "./reducer";

export type TabGroupProps = {
  children: [ReactElement<TabListProps>, ReactElement<TabPanelsProps>];
  className?: string;
  onChangePage?: (_: number) => void;
};

export function TabGroup(props: Readonly<TabGroupProps>) {
  const { onChangePage, ...other } = props;
  const [state, dispatch] = useReducer(reducer, initialTabGroupState);
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
  const previousTab = useCallback(() => dispatch({ type: "PREV_TAB" }), []);
  const nextTab = useCallback(() => dispatch({ type: "NEXT_TAB" }), []);
  const actions = useMemo(() => {
    return {
      registerPanel,
      unregisterPanel,
      selectTab,
      previousTab,
      nextTab,
    };
  }, [registerPanel, selectTab, unregisterPanel, previousTab, nextTab]);

  useEffect(() => {
    onChangePage?.(state.selectedIndex);
  }, [onChangePage, state.selectedIndex]);

  return (
    <TabActionsContext value={actions}>
      <TabDataContext value={state}>
        <div ref={groupRef} {...other} />
      </TabDataContext>
    </TabActionsContext>
  );
}
