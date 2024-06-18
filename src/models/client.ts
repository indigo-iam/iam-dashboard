export interface Scope {
  id: number;
  value: string;
  description: string;
  icon: string;
  defaultScope: boolean;
  restricted: boolean;
}

export interface ClientRequest {
  redirect_uris: string[];
  client_name: string;
  client_description: string;
  contacts: string[];
  token_endpoint_auth_method: string;
  scope: string;
  grant_types: string[];
  response_types: string[];
}

export type TokenEndpointAuthMethod =
  | "client_secret_basic"
  | "client_secret_post"
  | "client_secret_jwt"
  | "private_key_jwt"
  | "none";

export type Client = {
  client_id: string;
  client_secret?: string;
  client_name?: string;
  client_description?: string;
  redirect_uris?: string[];
  contacts?: string[];
  grant_types?: string[];
  token_endpoint_auth_method?: TokenEndpointAuthMethod;
  scope?: string;
  access_token_validity_seconds: number;
  id_token_validity_seconds: number;
  device_code_validity_seconds: number;
  reuse_refresh_token: boolean;
  dynamically_registered: boolean;
  allow_introspection: boolean;
  clear_access_tokens_on_refresh: boolean;
  require_auth_time: boolean;
  created_at?: number;
  active: boolean;
  status_changed_on?: number;
  error?: string;
};
