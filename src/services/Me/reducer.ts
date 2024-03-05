import { Me, GroupRequests } from "@models/Me";

export interface State {
  me?: Me;
  groupRequests?: GroupRequests;
}

export const initialState: State = {};

type Action =
  | { type: "UPDATE_ME"; me: Me }
  | { type: "UPDATE_GROUP_REQUESTS"; groupRequests: GroupRequests };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_ME": {
      const { me } = action;
      return { ...state, me };
    }
    case "UPDATE_GROUP_REQUESTS": {
      const { groupRequests } = action;
      return { ...state, groupRequests };
    }
  }
  return state;
};
