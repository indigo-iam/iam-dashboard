import { IamState } from "./IamState";
import { IamUser } from "./IamUser";

type Action = { type: "UPDATE_SCIM_ME"; user: IamUser };

export const reducer = (state: IamState, action: Action) => {
  switch (action.type) {
    case "UPDATE_SCIM_ME": {
      const { user } = action;
      return { ...state, user };
    }
  }
  return state;
};
