import { IamUser } from "./IamUser";

export interface IamState {
  user?: IamUser;
}

export const initialIamState = {
  user: undefined,
};
