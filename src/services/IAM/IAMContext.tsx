import { createContext } from "react";

export interface IAMContextProps {
	/** Dummy example of authorized API */
  fetchScimMe: () => Promise<JSON>;
}

export const IAMContext = createContext<IAMContextProps | undefined>(undefined);
