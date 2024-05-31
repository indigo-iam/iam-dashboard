"use server";
import getConfig from "@/utils/config";
import { Scope } from "@/models/client";
import { getItem } from "@/utils/fetch";

const { BASE_URL } = getConfig();

export const fetchScopes = async () =>
  getItem<Scope[]>(`${BASE_URL}/api/scopes`);
