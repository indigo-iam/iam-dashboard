import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider, type AuthProviderProps } from "react-oidc-context";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { IAMProvider, IAMProviderProps } from "./services/IAM";

// Add `env` namespace to window
interface EnvInterface {
  IAM_AUTHORITY: string;
  IAM_CLIENT_ID: string;
  IAM_CLIENT_SECRET?: string;
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
  client_secret: window.env.IAM_CLIENT_SECRET,
  scope: window.env.IAM_SCOPE,
  redirect_uri: window.location.origin,
};

const iamConfig: IAMProviderProps = {
  endpoint: window.env.IAM_AUTHORITY,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <IAMProvider {...iamConfig}>
        <App />
      </IAMProvider>
    </AuthProvider>
  </React.StrictMode>
);