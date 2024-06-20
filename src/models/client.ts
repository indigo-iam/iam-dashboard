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

export interface ClientBase {
  created_at?: number;
  client_id: string;
  client_name?: string;
  client_description?: string;
  redirect_uris?: string[];
  dynamically_registered: boolean;
  contacts?: string[];
  active: boolean;
  allow_introspection: boolean;
  status_changed_on?: number;
  error?: string;
}

export type TokenEndpointAuthMethod =
  | "client_secret_basic"
  | "client_secret_post"
  | "client_secret_jwt"
  | "private_key_jwt"
  | "none";

export interface ClientCredentials {
  token_endpoint_auth_method?: TokenEndpointAuthMethod;
}

export interface ClientScopes {
  scope?: string;
}

export interface ClientGrantTypes {
  grant_types?: string[];
}

export interface AccessTokenSettings {
  access_token_validity_seconds: number;
  id_token_validity_seconds: number;
  require_auth_time: boolean;
}

export interface RefreshTokenSettings {
  refresh_token_validity_second: number;
  reuse_refresh_token: boolean;
  clear_access_tokens_on_refresh: boolean;
}

export interface DeviceCodeSettings {
  device_code_validity_seconds: number;
}

export type CodeChallengeMethod = "none" | "plain" | "S256";

export interface ClientCodeChallenge {
  code_challenge_method?: CodeChallengeMethod;
}

export interface ClientOtherInfo {
  client_uri?: string;
  policy_uri?: string;
  tos_uri?: string;
}

export interface Client
  extends ClientBase,
    ClientCredentials,
    ClientScopes,
    ClientGrantTypes,
    AccessTokenSettings,
    RefreshTokenSettings,
    DeviceCodeSettings,
    ClientCodeChallenge,
    ClientOtherInfo {}
