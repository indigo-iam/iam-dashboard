// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { fetchAttributes } from "@/services/users";
import AttributeOptions from "./options";

type TableProps = {
  userId: string;
  userName: string;
};

export default async function AttributesTable(props: Readonly<TableProps>) {
  const { userId, userName } = props;
  const attributes = await fetchAttributes(userId);

  if (!attributes || attributes.length === 0) {
    return <p>No Attributes found.</p>;
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
            <AttributeOptions userId={userId} userName={userName} attr={attr} />
          </li>
        );
      })}
    </ul>
  );
}
