// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SSHKey } from "@/models/indigo-user";
import { dateToHuman } from "@/utils/dates";
import SSHKeysOptions from "./options";

type SSHKeyViewProps = {
  userId: string;
  userFormattedName: string;
  sshKey: SSHKey;
};

function SSHKeyView(props: Readonly<SSHKeyViewProps>) {
  const { userId, userFormattedName, sshKey } = props;
  const createdAt = sshKey.created
    ? dateToHuman(new Date(sshKey.created))
    : "N/A";
  return (
    <li className="iam-list-item overflow-hidden">
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
      <SSHKeysOptions
        userId={userId}
        userFormattedName={userFormattedName}
        sshKey={sshKey}
      />
    </li>
  );
}

type TableProps = {
  userId: string;
  userFormattedName: string;
  sshKeys: SSHKey[];
};

export default function Table(props: Readonly<TableProps>) {
  const { userId, userFormattedName, sshKeys } = props;
  if (sshKeys.length === 0) {
    return <p>No SSH keys found.</p>;
  }
  return (
    <ul className="w-full">
      {sshKeys.map(key => (
        <SSHKeyView
          key={key.fingerprint}
          userId={userId}
          userFormattedName={userFormattedName}
          sshKey={key}
        />
      ))}
    </ul>
  );
}
