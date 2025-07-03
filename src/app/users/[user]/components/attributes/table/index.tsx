// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { fetchAttributes } from "@/services/users";
import AttributeOptions from "./options";

type TableProps = {
  user: User;
};

export default async function AttributesTable(props: Readonly<TableProps>) {
  const { user } = props;
  const attributes = await fetchAttributes(user.id);

  if (!attributes || attributes.length === 0) {
    return (
      <p className="dark:text-light-gray/80 p-2 font-light">
        No Attributes found.
      </p>
    );
  }

  return (
    <ul className="w-full">
      {attributes.map(attr => {
        return (
          <li className="iam-list-item" key={attr.name}>
            <div className="flex grow flex-col">
              <div className="inline-flex gap-1">
                <span className="font-bold">Name:</span>
                <span>{attr.name}</span>
              </div>
              <div className="inline-flex gap-1">
                <span className="font-bold">Value:</span>
                <span>{attr.value}</span>
              </div>
            </div>
            <AttributeOptions user={user} attr={attr} />
          </li>
        );
      })}
    </ul>
  );
}
