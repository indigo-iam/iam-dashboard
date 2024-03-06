import { createContext } from "react";
import { State } from "./reducer";
import { GroupRequests, Me } from "@models/Me";

export interface MeContextProps extends State {
  me?: Me;
  groupRequests?: GroupRequests;
}

export const MeContext = createContext<MeContextProps | undefined>(undefined);
