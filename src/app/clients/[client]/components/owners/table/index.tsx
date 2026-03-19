// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { Client } from "@/models/client";
import { OwnerOptions } from "./options";

type OwnersTableProps = {
  owners: User[];
  client: Client;
};

export function OwnersTable(props: Readonly<OwnersTableProps>) {
  const { owners, client } = props;
  return (
    <ul>
      {owners.map(owner => {
        return (
          <li key={owner.id} className="iam-list-item">
            <div className="flex grow flex-col">
              <p className="text-gray-950 dark:text-gray-200">
                {owner.name?.formatted ?? "Unknown name"}
              </p>
              <p className="text-sm font-light">
                {owner.emails?.[0].value ?? "Unknown email address"}
              </p>
            </div>
            <OwnerOptions owner={owner} client={client} />
          </li>
        );
      })}
    </ul>
  );
}
