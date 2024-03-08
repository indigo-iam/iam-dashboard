import { useContext } from "react";
import { GroupsContext, GroupsContextProps } from "./Context";

export const useGroups = (): GroupsContextProps => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error(
      "GroupsProvider context is undefined, " +
        "please verify you are calling useGroups " +
        "as a child of <GroupsProvider> component."
    );
  }
  return context;
};
