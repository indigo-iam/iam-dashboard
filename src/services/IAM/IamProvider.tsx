import { useCallback, useEffect, useReducer } from "react";
import { useAuth } from "react-oidc-context";
import { IamContext } from "./IamContext";
import { makeIamUser } from "./IamUser";
import { initialIamState } from "./IamState";
import { reducer } from "./reducer";

interface IamProviderBaseProps {
  children?: React.ReactNode;
}

export interface IamProviderProps extends IamProviderBaseProps {
  authority: string;
}

export const IamProvider = (props: IamProviderProps): JSX.Element => {
  const { authority, children } = props;
  const [state, dispatch] = useReducer(reducer, initialIamState);
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

  const fetchScimMe = useCallback(async () => {
    const response = await get("/scim/Me");
    const json = await response.json();
    const user = makeIamUser(JSON.stringify(json));
    dispatch({ type: "UPDATE_SCIM_ME", user });
  }, [get]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchScimMe();
    }
  }, [auth.isAuthenticated, fetchScimMe]);

  const { user } = state;

  return (
    <IamContext.Provider
      value={{
        logout,
        user,
      }}
    >
      {children}
    </IamContext.Provider>
  );
};
