// https://www.rfc-editor.org/rfc/rfc7643#section-4.1
export interface ScimUser {
  id: string;
  userName?: string;
  name?: {
    formatted?: string;
    familyName?: string;
    givenName?: string;
    middleName?: string;
    displayName?: string;
    honorificPrefix?: string;
  };
  displayName?: string;
  nickName?: string;
  profileUrl?: string;
  title?: string;
  userType?: string;
  preferredLanguage?: string;
  locale?: string;
  timezone?: string;
  active?: boolean;
  password?: string;
  schemas?: string[];
  emails?: ScimEmail[];
  meta?: {
    created?: string;
    lastModified?: string;
    location?: string;
  };
  "urn:indigo-dc:scim:schemas:IndigoUser"?: {
    aupSignatureTime?: string;
    authorities?: string[];
  };
}

// https://www.rfc-editor.org/rfc/rfc7643#section-4.1.2
export interface ScimEmail {
  value: string;
  type: "home" | "work" | "other";
  primary: boolean;
}

type ScimEmails = {
  emails: ScimEmail[];
};

export interface ScimOp {
  op: "add" | "remove" | "replace" | "move" | "copy" | "test";
  value: ScimUser | ScimEmails;
}

type ScimSchema = "urn:ietf:params:scim:api:messages:2.0:PatchOp";

// https://www.rfc-editor.org/rfc/rfc7644#section-3.5.2
export interface ScimRequest {
  schemas: ScimSchema[];
  operations: ScimOp[];
  path?: string;
}
