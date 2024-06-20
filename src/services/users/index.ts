"use server";
import { getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { UserPage } from "@/models/user";

const { BASE_URL } = getConfig();

export const searchUser = async (filter: string) => {
  const response = await getItem<UserPage>(
    `${BASE_URL}/iam/account/search?count=100&startIndex=0&filter=${filter}`
  );
  return response.Resources;
};
