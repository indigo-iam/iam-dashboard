import { IamUser } from "./models/IamUser";

export interface IamState {
  user?: IamUser;
}

export const initialIamState = {
  user: undefined,
};
