import { IndigoUser } from "./indigo-user";

// https://www.rfc-editor.org/rfc/rfc7643#section-4.1
export interface ScimUser {
  id: string;
  userName?: string;
  name?: Name;
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
  emails?: Email[];
  groups?: ScimReference[];
  meta?: {
    created?: string;
    lastModified?: string;
    location?: string;
  };
  "urn:indigo-dc:scim:schemas:IndigoUser"?: IndigoUser;
}

type Name = {
  familyName?: string;
  givenName?: string;
  middleName?: string;
  formatted?: string;
  displayName?: string;
  honorificPrefix?: string;
};

// https://www.rfc-editor.org/rfc/rfc7643#section-4.1.2
export interface Email {
  value: string;
  type: "home" | "work" | "other";
  primary: boolean;
}

export type ScimReference = {
  display: string;
  value: string;
  $ref: string;
};

export interface ScimOp {
  op: "add" | "remove" | "replace" | "move" | "copy" | "test";
  value: ScimUser | Email[];
}

// https://www.rfc-editor.org/rfc/rfc7644#section-3.5.2
export interface ScimRequest {
  schemas: string[];
  operations: ScimOp[];
  path?: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  updatedPassword: string;
}
