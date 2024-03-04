import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useAuth } from "react-oidc-context";
import { IamContext } from "./IamContext";
import { IamUser } from "./models/IamUser";
import { initialIamState } from "./IamState";
import { reducer } from "./reducer";
import { IamGroupRequests } from "./models/GroupRequest";

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

  type GetItem = <T>(endpoint: string) => Promise<Promise<T>>;
  const getItem = useCallback<GetItem>(
    async (endpoint: string) => {
      const response = await get(endpoint);
      return response.json();
    },
    [get]
  );

  const logout = useCallback(async () => {
    try {
      const response = await fetch(new URL("/logout", authority), {
        credentials: "include",
      });
      console.log("Goodbye!");
      return response;
    } catch (err) {
      console.error("cannot log out:", err);
    }
  }, [authority]);

  const fetchScimMe = useCallback(async () => {
    const user = await getItem<IamUser>("/scim/Me");
    dispatch({ type: "UPDATE_SCIM_ME", user });
  }, [getItem]);

  const fetchGroupRequests = useCallback(async () => {
    const url = "/iam/group_requests?status=PENDING";
    const groupRequests = await getItem<IamGroupRequests>(url);
    dispatch({ type: "UPDATE_GROUP_REQUESTS", groupRequests });
  }, [getItem]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchScimMe();
      fetchGroupRequests();
    }
  }, [auth.isAuthenticated, fetchScimMe, fetchGroupRequests]);

  const { user, groupRequests } = state;
  const value = useMemo(
    () => ({
      logout,
      user,
      groupRequests,
    }),
    [groupRequests, logout, user]
  );

  return <IamContext.Provider value={value}>{children}</IamContext.Provider>;
};
