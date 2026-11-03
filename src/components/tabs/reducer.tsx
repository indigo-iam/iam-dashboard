// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { RefPanel } from "./context";

type TabGroupState = {
  selectedIndex: number;
  panels: RefPanel[];
};

type TabAction =
  | { type: "REGISTER_PANEL"; panel: RefPanel }
  | { type: "UNREGISTER_PANEL"; panel: RefPanel }
  | { type: "SELECT_TAB"; index: number }
  | { type: "PREV_TAB" }
  | { type: "NEXT_TAB" };

export const initialTabGroupState: TabGroupState = {
  selectedIndex: 0,
  panels: [],
};

export function reducer(
  state: TabGroupState,
  action: TabAction
): TabGroupState {
  switch (action.type) {
    case "REGISTER_PANEL": {
      if (state.panels.includes(action.panel)) {
        return state;
      }
      const panels = [...state.panels];
      panels.push(action.panel);
      return {
        ...state,
        panels,
      };
    }
    case "UNREGISTER_PANEL": {
      return {
        ...state,
        panels: state.panels.filter(p => p != action.panel),
      };
    }
    case "SELECT_TAB":
      return {
        ...state,
        selectedIndex: action.index,
      };
    case "PREV_TAB": {
      if (state.selectedIndex === 0) {
        return state;
      }
      return {
        ...state,
        selectedIndex: state.selectedIndex - 1,
      };
    }
    case "NEXT_TAB": {
      if (state.selectedIndex === state.panels.length - 1) {
        return state;
      }
      return {
        ...state,
        selectedIndex: state.selectedIndex + 1,
      };
    }
  }
}
