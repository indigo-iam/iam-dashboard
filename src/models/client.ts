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
  active: boolean;
  allow_introspection?: boolean; // admin
  client_description: string;
  client_id: string;
  client_name: string;
  client_secret: string;
  contacts: string[];
  created_at: number;
  redirect_uris: string[];
  dynamically_registered: boolean;
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
  token_endpoint_auth_method: TokenEndpointAuthMethod;
}

export interface ClientScopes {
  scope?: string;
}

export interface ClientGrantTypes {
  grant_types: string[];
}

export interface AccessTokenSettings {
  access_token_validity_seconds?: number; // admin
  id_token_validity_seconds?: number;     // admin
  require_auth_time: boolean; // FIXME: this should be optional and admin only
}

export interface RefreshTokenSettings {
  refresh_token_validity_seconds?: number; // admin
  reuse_refresh_token?: boolean;           // admin
  clear_access_tokens_on_refresh: boolean; // FIXME: this should be optional and admin only
}

export interface DeviceCodeSettings {
  device_code_validity_seconds?: number; // admin
}

export type CodeChallengeMethod = "none" | "plain" | "S256";

export interface ClientCodeChallenge {
  code_challenge_method: CodeChallengeMethod;
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
