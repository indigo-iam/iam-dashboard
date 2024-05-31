type Meta = {
  created?: string;
  lastModified?: string;
  location: string;
  resourceType: string;
};

type Name = {
  familyName?: string;
  givenName?: string;
  middleName?: string;
  formatted?: string;
};

type Email = {
  type?: string;
  value: string;
  primary: boolean;
};

type Group = {
  display: string;
  value: string;
  $ref: string;
};

export type OidcId = {
  issuer: string;
  subject: string;
};

export type SamlId = {
  idpId: string;
  userId: string;
  attributeId: string;
};

export type Certificate = {
  primary: boolean;
  subjectDn: string;
  issuerDn: string;
  pemEncodedCertificate: string;
  display?: string;
  created?: string;
  lastModified?: string;
  hasProxyCertificate: boolean;
};

type ScimSchema = {
  oidcIds?: OidcId[];
  samlIds?: SamlId[];
  certificates?: Certificate[];
};

export interface Me {
  id: string;
  meta: Meta;
  schemas: string[];
  userName: string;
  name: Name;
  displayName?: string;
  active: boolean;
  emails: Email[];
  groups?: Group[];
  "urn:indigo-dc:scim:schemas:IndigoUser": ScimSchema;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  updatedPassword: string;
}

export interface MeClient {
  client_id: string;
  redirect_uris: string[];
  client_name: string;
  contacts: string[];
  token_endpoint_auth_method: string;
  scope: string;
  grant_types: string[];
  response_types: string[];
  created_at: number;
}

export interface MeClients {
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: MeClient[];
}
