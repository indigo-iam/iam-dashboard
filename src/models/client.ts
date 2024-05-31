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
