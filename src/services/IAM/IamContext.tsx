import { createContext } from "react";

export interface IamContextProps {
  logout: () => Promise<Response | undefined>;
  fetchScimMe: () => Promise<JSON>;
}

export const IamContext = createContext<IamContextProps | undefined>(undefined);
