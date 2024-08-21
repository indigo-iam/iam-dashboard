"use server";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { ScimOp, ScimRequest, ScimUser } from "@/models/scim";
import { Paginated } from "@/models/pagination";
import { Client } from "@/models/client";

const { BASE_URL } = getConfig();

export const fetchMe = async () => getItem<ScimUser>(`${BASE_URL}/scim/Me`);

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
    return "";
  } else {
    const msg = await response.text();
    return `Patch Me failed with status ${response.status} ${msg}`;
  }
};
