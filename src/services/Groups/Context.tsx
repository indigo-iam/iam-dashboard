import { createContext } from "react";
import { Group } from "@models/Groups";

export interface GroupsContextProps {
  groups?: Group[];
  fetchGroups?: () => void;
}

export const GroupsContext = createContext<GroupsContextProps | undefined>(
  undefined
);
