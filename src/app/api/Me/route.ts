import { authFetch } from "@/utils/fetch";
import getConfig from "@/utils/config";

const { BASE_URL } = getConfig();
const url = `${BASE_URL}/scim/Me`;

export const GET = async () => {
  return await authFetch(url);
};

export const POST = async (request: Request) => {
  const body = JSON.stringify(await request.json());
  const method = "POST";
  return await authFetch(url, { body, method });
};

export const PATCH = async (request: Request) => {
  const body = JSON.stringify(await request.json());
  const method = "PATCH";
  const headers = { "content-type": "application/scim+json" };
  return await authFetch(url, { body, method, headers });
};
