"use server";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { User, UserPage } from "@/models/user";
import { Paginated } from "@/models/pagination";
import { ScimUser } from "@/models/scim";
import { revalidatePath } from "next/cache";

const { BASE_URL } = getConfig();

export const searchUser = async (filter: string) => {
  const response = await getItem<UserPage>(
    `${BASE_URL}/iam/account/search?count=100&startIndex=0&filter=${filter}`
  );
  return response.Resources;
};

export const getUsersPage = async (
  count: number,
  startIndex: number = 1,
  filter?: string
) => {
  let url = `${BASE_URL}/iam/account/search?count=${count}&startIndex=${startIndex}`;
  if (filter) {
    url += `&filter=${filter}`;
  }
  return await getItem<Paginated<User>>(url);
};

export const addUser = async (user: ScimUser) => {
  const url = `${BASE_URL}/scim/Users`;
  const response = await authFetch(url, {
    body: JSON.stringify(user),
    method: "POST",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath("/users");
  } else {
    const msg = await response.text();
    throw Error(`Add User failed with status ${response.status} ${msg}`);
  }
};

export const deleteUser = async (user: User) => {
  console.log("Delete user", user.name.formatted);
};
