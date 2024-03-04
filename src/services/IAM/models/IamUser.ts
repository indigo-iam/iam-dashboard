type Meta = {
  created?: string;
  lastModified?: string;
  location: string;
  resourceType: string;
};

type Name = {
  familyName?: string;
  formatted?: string;
  givenName?: string;
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

export interface IamUser {
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
