import { Me, GroupRequests } from "./models/me";
import { IamState } from "./IamState";

type Action =
  | { type: "UPDATE_ME"; user: Me }
  | { type: "UPDATE_GROUP_REQUESTS"; groupRequests: GroupRequests };

export const reducer = (state: IamState, action: Action) => {
  switch (action.type) {
    case "UPDATE_ME": {
      const { user } = action;
      return { ...state, user };
    }
    case "UPDATE_GROUP_REQUESTS": {
      const { groupRequests } = action;
      return { ...state, groupRequests };
    }
  }
  return state;
};
