import { createContext } from "react";
import { State } from "./reducer";
import { GroupRequests, Me } from "@models/Me";
import { ScimRequest } from "@models/Scim";

export interface MeContextProps extends State {
  me?: Me;
  groupRequests?: GroupRequests;
  fetchMe: () => void;
  updatePassword: (passwordRequest: FormData) => Promise<Response>;
  updateMe: (patchOp: ScimRequest) => Promise<Response>;
}

export const MeContext = createContext<MeContextProps | undefined>(undefined);
