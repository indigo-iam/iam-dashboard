import { authFetch } from "@/utils/fetch";
import getConfig from "@/utils/config";

const { BASE_URL } = getConfig();
const url = `${BASE_URL}/iam/group_requests`;

export const POST = async (request: Request) => {
  const body = JSON.stringify(await request.json());
  const method = "POST";
  const headers = {
    "content-type": "application/json"
  }
  return await authFetch(url, { headers, body, method });
};
