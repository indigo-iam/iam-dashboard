import { createContext } from "react";

export interface IAMContextProps {
  logout: () => Promise<Response | undefined>;
  fetchScimMe: () => Promise<JSON>;
}

export const IAMContext = createContext<IAMContextProps | undefined>(undefined);
