export interface OpenIdConfiguration {
  request_parameter_supported: boolean;
  introspection_endpoint: string;
  claims_parameter_supported: boolean;
  scim_endpoint: string;
  scopes_supported: string[];
  userinfo_encryption_enc_values_supported: string[];
  id_token_encryption_enc_values_supported: string[];
  request_object_encryption_enc_values_supported: string[];
  device_authorization_endpoint: string;
  userinfo_signing_alg_values_supported: string[];
  claims_supported: string[];
  op_policy_uri: string;
  claim_types_supported: string[];
  token_endpoint_auth_methods_supported: string[];
  token_endpoint: string;
  response_types_supported: string[];
  request_uri_parameter_supported: boolean;
  userinfo_encryption_alg_values_supported: string[];
  grant_types_supported: string[];
  revocation_endpoint: string;
  userinfo_endpoint: string;
  op_tos_uri: string;
  token_endpoint_auth_signing_alg_values_supported: string[];
  require_request_uri_registration: boolean;
  code_challenge_methods_supported: string[];
  id_token_encryption_alg_values_supported: string[];
  jwks_uri: string;
  subject_types_supported: string[];
  id_token_signing_alg_values_supported: string[];
  registration_endpoint: string;
  request_object_signing_alg_values_supported: string[];
  request_object_encryption_alg_values_supported: string[];
}

export type GrantType =
  | "authorization_code"
  | "client_credentials"
  | "urn:ietf:params:oauth:grant-type:device_code";
