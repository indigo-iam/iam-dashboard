import { useContext } from "react";
import { IamContext, IamContextProps } from "./IamContext";

export const useIam = (): IamContextProps => {
  const context = useContext(IamContext);
  if (!context) {
    throw new Error(
      "IamProvider context is undefined, " +
        "please verify you are calling useIAM " +
        "as a child of <IamProvider> component."
    );
  }
  return context;
};
