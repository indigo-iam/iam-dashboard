import { createContext } from "react";
import { State } from "./reducer";

export interface MeContextProps extends State {}

export const MeContext = createContext<MeContextProps | undefined>(undefined);
