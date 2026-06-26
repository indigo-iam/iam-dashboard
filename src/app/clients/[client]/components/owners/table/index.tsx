// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { OwnerOptions } from "./options";

type OwnersTableProps = {
  clientId: string;
  clientName: string;
  owners: User[];
};

export function OwnersTable(props: Readonly<OwnersTableProps>) {
  const { clientId, clientName, owners } = props;
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
            <OwnerOptions
              ownerId={owner.id}
              ownerName={owner.name?.formatted ?? "unknown user"}
              ownerEmail={owner.emails?.[0].value ?? "unknown email"}
              clientId={clientId}
              clientName={clientName}
            />
          </li>
        );
      })}
    </ul>
  );
}
