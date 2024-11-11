"use server";
import { getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { Registration } from "@/models/registration";

const { BASE_URL } = getConfig();

export const fetchRegistrationRequests = async () => {
  let url = `${BASE_URL}/registration/list/pending`;
  return await getItem<Registration[]>(url);
};
