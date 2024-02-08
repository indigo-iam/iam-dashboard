import { useContext } from "react";
import { IAMContext, IAMContextProps } from "./IAMContext";

export const useIAM = (): IAMContextProps => {
  const context = useContext(IAMContext);
  if (!context) {
    throw new Error(
      "IAMProvider context is undefined, " +
        "please verify you are calling useIAM " +
        "as a child of <IAMProvider> component."
    );
  }
  return context;
};
