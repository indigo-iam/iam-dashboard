import { createContext } from "react";
import { State } from "./reducer";
import { GroupRequests, Me } from "@models/Me";

export interface MeContextProps extends State {
  me: Me;
  groupRequest: GroupRequests;
}

export const MeContext = createContext<MeContextProps | undefined>(undefined);
