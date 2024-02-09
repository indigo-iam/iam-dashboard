import { useAuth } from "react-oidc-context";
import { IamContext } from "./IamContext";
import { useCallback } from "react";

interface IamProviderBaseProps {
  children?: React.ReactNode;
}

export interface IamProviderProps extends IamProviderBaseProps {
  authority: string;
}

export const IamProvider = (props: IamProviderProps): JSX.Element => {
  const { authority, children } = props;
  const auth = useAuth();

  // HTTP GET
  const get = useCallback(
    async (endpoint: string) => {
      const token = auth.user?.access_token;
      if (!token) {
        throw new Error("access token is undefined");
      }
      const url = new URL(endpoint, authority);
      return await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [authority, auth.user]
  );

  const logout = useCallback(async () => {
    try {
      const response = await get("/logout");
      console.log("Goodbye!");
      return response;
    } catch (err) {
      console.error("cannot log out:", err);
    }
  }, [get]);

  /** Dummy example of authorized API */
  const fetchScimMe = useCallback(async () => {
    const response = await get("/scim/Me");
    return response.json();
  }, [get]);

  return (
    <IamContext.Provider
      value={{
        logout,
        fetchScimMe,
      }}
    >
      {children}
    </IamContext.Provider>
  );
};
