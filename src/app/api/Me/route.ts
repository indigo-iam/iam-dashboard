import { authFetch } from "@/utils/fetch";
const url = new URL("/scim/Me", process.env.IAM_AUTHORITY_URL);

export const GET = async () => {
  return await authFetch(url);
};

export const POST = async (request: Request) => {
  const body = JSON.stringify(await request.json());
  const url = new URL(request.url, process.env.IAM_AUTHORITY_URL);
  const method = "POST";
  return await authFetch(url, { body, method });
};

export const PATCH = async (request: Request) => {
  const body = JSON.stringify(await request.json());
  const method = "PATCH";
  const headers = { "content-type": "application/scim+json" };
  return await authFetch(url, { body, method, headers });
};
 