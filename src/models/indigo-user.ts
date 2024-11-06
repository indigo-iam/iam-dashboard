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

export type SSHKey = {
  display: string;
  value: string;
  primary?: boolean;
  fingerprint?: string;
  created?: string;
  lastModified?: string;
};

export type IndigoUser = {
  aupSignatureTime?: string;
  endTime?: string;
  oidcIds?: OidcId[];
  samlIds?: SamlId[];
  certificates?: Certificate[];
  authorities?: string[];
  sshKeys?: SSHKey[];
};
