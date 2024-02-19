import { IamUser } from "./models/IamUser";
import { IamGroupRequests } from "./models/GroupRequest";
import { IamState } from "./IamState";

type Action =
  | { type: "UPDATE_SCIM_ME"; user: IamUser }
  | { type: "UPDATE_GROUP_REQUESTS"; groupRequests: IamGroupRequests };

export const reducer = (state: IamState, action: Action) => {
  switch (action.type) {
    case "UPDATE_SCIM_ME": {
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
