export interface OpenIdConfiguration {
  // OpenID Provider Metadata
  // https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint?: string; // Recommended
  jwks_uri: string;
  registration_endpoint?: string; // Recommended
  scopes_supported?: string[]; // Recommended
  response_types_supported: string[];
  response_modes_supported?: string[];
  grant_types_supported?: string[];
  acr_values_supported?: string[];
  subject_types_supported?: string[];
  id_token_signing_alg_values_supported: string[];
  id_token_encryption_alg_values_supported?: string[];
  id_token_encryption_enc_values_supported?: string[];
  userinfo_signing_alg_values_supported?: string[];
  userinfo_encryption_alg_values_supported?: string[];
  userinfo_encryption_enc_values_supported?: string[];
  request_object_signing_alg_values_supported?: string[];
  request_object_encryption_alg_values_supported?: string[];
  request_object_encryption_enc_values_supported?: string[];
  token_endpoint_auth_methods_supported?: string[];
  token_endpoint_auth_signing_alg_values_supported?: string[];
  display_values_supported?: string[];
  claim_types_supported?: string[];
  claims_supported?: string[]; // Recommended
  service_documentation?: string;
  claims_locales_supported?: string[];
  ui_locales_supported?: string[];
  claims_parameter_supported?: boolean;
  request_parameter_supported?: boolean;
  request_uri_parameter_supported?: boolean;
  require_request_uri_registration?: boolean;
  op_policy_uri?: string;
  op_tos_uri?: string;

  // OAuth 2.0 Authorization Server Metadata
  // https://www.rfc-editor.org/rfc/rfc8414#section-2
  revocation_endpoint?: string;
  introspection_endpoint?: string;
  code_challenge_methods_supported?: string[];

  // OAuth 2.0 Device Authorization Grant
  // https://www.rfc-editor.org/rfc/rfc8628#section-4
  device_authorization_endpoint?: string;

  // OpenID Connect Profile for SCIM Services Discovery Metadata
  // https://openid.net/specs/openid-connect-scim-profile-1_0.html#rfc.section.2.1
  scim_endpoint?: string; // Recommended
}
