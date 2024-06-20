import { Client } from "./client";
import { User } from "./user";

export interface Me extends User {}

export interface UpdatePasswordRequest {
  currentPassword: string;
  updatedPassword: string;
}

export interface MeClient extends Client {}

export interface MeClients {
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: MeClient[];
}
