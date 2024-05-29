import { Aup } from "@/models/aup";
import getConfig from "@/utils/config";
import { getItem } from "@/utils/fetch";

const { BASE_URL } = getConfig();

export const fetchAup = async () => {
  let url = `${BASE_URL}/iam/aup`;

  return await getItem<Aup>(url);
};

export const fetchAupSignature = async () => {
  let url = `${BASE_URL}/iam/aup/signature`;

  return await getItem<Aup>(url);
};

// export const editAup = async (_: string | undefined, formData: FormData) => {
//   const urlAup = formData.get("url") as string | undefined;
//   const validity = formData.get("validity") as string | undefined;

//   let url = `${BASE_URL}/iam/aup`;

//   //   return await putItem<Aup>(url);
// };
