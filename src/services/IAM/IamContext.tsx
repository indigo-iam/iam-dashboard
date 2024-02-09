import { createContext } from "react";
import { IamUser } from "./IamUser";

export interface IamContextProps {
  logout: () => Promise<Response | undefined>;
  user?: IamUser;
}

export const IamContext = createContext<IamContextProps | undefined>(undefined);
