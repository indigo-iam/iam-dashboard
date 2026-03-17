// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SSHKey } from "@/models/indigo-user";
import { User } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";
import SSHKeysOptions from "./options";

function SSHKeyView(props: Readonly<{ user: User; sshKey: SSHKey }>) {
  const { user, sshKey } = props;
  const createdAt = sshKey.created
    ? dateToHuman(new Date(sshKey.created))
    : "N/A";
  return (
    <li className="iam-list-item flex flex-row overflow-hidden">
      <div className="my-auto flex grow flex-col gap-1 truncate">
        <p className="text-lg text-gray-950 dark:text-gray-100">
          {sshKey.display}
        </p>
        <p className="text-gray truncate text-sm" title={sshKey.fingerprint}>
          {sshKey.fingerprint}
        </p>
      </div>
      <div className="my-auto hidden px-2 text-sm font-light sm:flex">
        Created {createdAt}
      </div>
      <SSHKeysOptions user={user} sshKey={sshKey} />
    </li>
  );
}

type TableProps = {
  user: User;
};

export default function Table(props: Readonly<TableProps>) {
  const { user } = props;

  const indigoUser = user["urn:indigo-dc:scim:schemas:IndigoUser"];
  let sshKeys: SSHKey[] = [];

  if (indigoUser?.sshKeys) {
    sshKeys = indigoUser.sshKeys;
  }

  if (sshKeys.length === 0) {
    return (
      <p className="text-gray p-2 dark:text-white/60">No SSH keys found.</p>
    );
  }
  return (
    <ul className="w-full">
      {sshKeys.map(key => (
        <SSHKeyView key={key.fingerprint} user={user} sshKey={key} />
      ))}
    </ul>
  );
}
