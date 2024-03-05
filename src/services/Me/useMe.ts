import { useContext } from "react";
import { MeContext, MeContextProps } from "./Context";

export const useMe = (): MeContextProps => {
  const context = useContext(MeContext);
  if (!context) {
    throw new Error(
      "MeProvider context is undefined, " +
        "please verify you are calling useMe " +
        "as a child of <MeProvider> component."
    );
  }
  return context;
};
