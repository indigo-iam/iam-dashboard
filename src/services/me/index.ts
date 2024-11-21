"use server";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { ScimOp, ScimRequest, User } from "@/models/scim";
import { Paginated } from "@/models/pagination";
import { Client } from "@/models/client";
import { revalidatePath } from "next/cache";
import { setNotification } from "@/components/Toaster";

const { BASE_URL } = getConfig();

export const fetchMe = async () => getItem<User>(`${BASE_URL}/scim/Me`);

export const getClientsPage = async (count: number, startIndex: number = 1) => {
  return await getItem<Paginated<Client>>(
    `${BASE_URL}/iam/account/me/clients?count=${count}&startIndex=${startIndex}`
  );
};

export const patchMe = async (formData: FormData) => {
  const op: ScimRequest = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    operations: [],
  };

  const givenName = formData.get("givenName") as string | undefined;
  const familyName = formData.get("familyName") as string | undefined;
  const middleName = formData.get("middleName") as string | undefined;

  if (givenName || familyName) {
    const userOp: ScimOp = {
      op: "replace",
      value: {
        displayName: `${givenName} ${familyName}`,
        name: {
          givenName,
          familyName,
          middleName,
        },
      },
    };
    op.operations.push(userOp);
  }

  const email = formData.get("email") as string | undefined;
  if (email) {
    const mailOp: ScimOp = {
      op: "replace",
      value: {
        emails: [
          {
            type: "work",
            value: email,
            primary: true,
          },
        ],
      },
    };
    op.operations.push(mailOp);
  }

  const response = await authFetch(`${BASE_URL}/scim/Me`, {
    body: JSON.stringify(op),
    method: "PATCH",
    headers: { "content-type": "application/scim+json" },
  });

  if (response.ok) {
    setNotification({ type: "success", message: "Saved" });
    revalidatePath("/users/me");
  } else {
    if (response.status == 409) {
      const json = await response.json();
      return { err: json.detail as string };
    }
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot save user",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};
