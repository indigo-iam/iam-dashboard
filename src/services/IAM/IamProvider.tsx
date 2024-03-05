import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useAuth } from "react-oidc-context";
import { IamContext } from "./IamContext";
import { initialIamState } from "./IamState";
import { useGenerics, useMe } from "./services";
import { reducer } from "./reducer";

interface IamProviderBaseProps {
  children?: React.ReactNode;
}

export interface IamProviderProps extends IamProviderBaseProps {}

export const IamProvider = (props: IamProviderProps): JSX.Element => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialIamState);
  const auth = useAuth();
  const { getMe, getGroupRequests } = useMe();
  const { logout } = useGenerics();

  const fetchScimMe = useCallback(async () => {
    const user = await getMe();
    dispatch({ type: "UPDATE_ME", user });
  }, [getMe]);

  const fetchGroupRequests = useCallback(async () => {
    const groupRequests = await getGroupRequests();
    dispatch({ type: "UPDATE_GROUP_REQUESTS", groupRequests });
  }, [getGroupRequests]);

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
