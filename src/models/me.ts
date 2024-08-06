import { ScimUser } from "./scim";

export interface Me extends ScimUser {}
export interface UpdatePasswordRequest {
  currentPassword: string;
  updatedPassword: string;
}
