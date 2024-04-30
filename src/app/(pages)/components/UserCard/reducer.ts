export interface UserCardState {
  showEditDetails: boolean;
  showChangePassword: boolean;
}

export const initialState: UserCardState = {
  showEditDetails: false,
  showChangePassword: false,
};

type Action =
  | { type: "SHOW_EDIT_DETAILS" }
  | { type: "HIDE_EDIT_DETAILS" }
  | { type: "SHOW_CHANGE_PASSWORD" }
  | { type: "HIDE_CHANGE_PASSWORD" };

export const reducer = (state: UserCardState, action: Action) => {
  switch (action.type) {
    case "SHOW_EDIT_DETAILS": {
      state.showEditDetails = true;
      return { ...state };
    }
    case "HIDE_EDIT_DETAILS": {
      state.showEditDetails = false;
      return { ...state };
    }
    case "SHOW_CHANGE_PASSWORD": {
      state.showChangePassword = true;
      return { ...state };
    }
    case "HIDE_CHANGE_PASSWORD": {
      state.showChangePassword = false;
      return { ...state };
    }
  }
};
