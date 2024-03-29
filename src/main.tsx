import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider, type AuthProviderProps } from "react-oidc-context";
import { IamProvider } from "@services/IAM";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Add `env` namespace to window
interface EnvInterface {
  IAM_AUTHORITY: string;
  IAM_CLIENT_ID: string;
  IAM_SCOPE: string;
  IAM_AUDIENCE: string;
}

declare global {
  interface Window {
    env: EnvInterface;
  }
}

const oidcConfig: AuthProviderProps = {
  authority: window.env.IAM_AUTHORITY,
  client_id: window.env.IAM_CLIENT_ID,
  scope: window.env.IAM_SCOPE,
  redirect_uri: window.location.origin + window.location.pathname,
  // https://github.com/authts/react-oidc-context/blob/f175dcba6ab09871b027d6a2f2224a17712b67c5/src/AuthProvider.tsx#L20-L30
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <IamProvider>
        <App />
      </IamProvider>
    </AuthProvider>
  </React.StrictMode>
);
