import { createContext } from "react";
import { IamUser } from "./models/IamUser";
import { IamGroupRequests } from "./models/GroupRequest";

export interface IamContextProps {
  logout: () => Promise<Response | undefined>;
  user?: IamUser;
  groupRequests?: IamGroupRequests;
}

export const IamContext = createContext<IamContextProps | undefined>(undefined);
