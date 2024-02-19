type Id = string;

type Meta = {
  created?: string;
  lastModified?: string;
  location: string;
  resourceType: string;
};

type Schema = string;

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

type OidcId = {
  issuer: string;
  subject: string;
};

type SamlId = {
  idpId: string;
  userId: string;
  attributeId: string;
};

type Certificate = {
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
  oidcIds: OidcId[];
  samlIds: SamlId[];
  certificates: Certificate[];
};

export interface IamUser {
  id: Id;
  meta: Meta;
  schemas: Schema[];
  userName: string;
  name: Name;
  displayName?: string;
  active: boolean;
  emails: Email[];
  groups?: Group[];
  "urn:indigo-dc:scim:schemas:IndigoUser": ScimSchema;
}
