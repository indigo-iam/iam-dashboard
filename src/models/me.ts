import { User } from "./user";

export interface Me extends User {}

export interface UpdatePasswordRequest {
  currentPassword: string;
  updatedPassword: string;
}
