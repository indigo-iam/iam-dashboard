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

  console.log("Server: "+endpoint)
  /** Dummy example of authorized API */
  const fetchScimMe = useCallback(async () => {
    const token = auth.user?.access_token;
    if (!token) {
      throw new Error("access token is undefined");
    }
    const url = new URL("/scim/Me", endpoint);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return await response.json();
  }, [endpoint, auth])

  return (
    <IAMContext.Provider
      value={{
        fetchScimMe
      }}>
      {children}
    </IAMContext.Provider>
  )
}
