import { IamUser } from "./models/IamUser";
import { IamGroupRequests } from "./models/GroupRequest";

export interface IamState {
  user?: IamUser;
  groupRequests?: IamGroupRequests;
}

export const initialIamState = {
  user: undefined,
  groupRequests: undefined,
};
