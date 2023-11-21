import { useAuth } from "react-oidc-context";
import { IAMContext } from "./IAMContext";
import { useCallback } from "react";

interface IAMProviderBaseProps {
  children?: React.ReactNode;
}

export interface IAMProviderProps extends IAMProviderBaseProps {
  endpoint: string;
}

export const IAMProvider = (props: IAMProviderProps): JSX.Element => {
  const { endpoint, children } = props;
  const auth = useAuth();

  /** Dummy example of authorized API */
  const fetchOpenIDConfiguration = useCallback(async () => {
    const token = auth.user?.access_token;
    if (token === undefined) {
      throw new Error("access token is undefined");
    }

    const url = new URL(".well-known/openid-configuration", endpoint);
    const response = await fetch(url, {
      // headers: {
      // 	Authorization: `Bearer ${token}`,
      // }
    });
    return await response.json();
  }, [endpoint, auth])

  return (
    <IAMContext.Provider
      value={{
        fetchOpenIDConfiguration
      }}>
      {children}
    </IAMContext.Provider>
  )
}
