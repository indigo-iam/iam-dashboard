// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { CommandLineIcon } from "@heroicons/react/24/solid";

import { SSHKey } from "@/models/indigo-user";
import { dateToHuman } from "@/utils/dates";
import { ListItem, UnorderedList } from "@/components/list";

import SSHKeysOptions from "./options";
import AddSSHKeyButton from "../add-button";

type SSHKeyViewProps = {
  userId: string;
  sshKey: SSHKey;
};

function SSHKeyView(props: Readonly<SSHKeyViewProps>) {
  const { userId, sshKey } = props;
  const createdAt = sshKey.created
    ? dateToHuman(new Date(sshKey.created))
    : "N/A";
  return (
    <ListItem>
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
      <SSHKeysOptions userId={userId} sshKey={sshKey} />
    </ListItem>
  );
}

type TableProps = {
  userId: string;
  sshKeys: SSHKey[];
  isMe: boolean;
};

export default function Table(props: Readonly<TableProps>) {
  const { userId, sshKeys, isMe } = props;
  if (sshKeys.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CommandLineIcon className="size-16 text-gray-500 dark:text-gray-300" />
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm">
            {`Link ${isMe ? "your" : ""} SSH public keys to ${isMe ? "your" : "the user"} account`}
          </p>
          <AddSSHKeyButton userId={userId} variant="solid" />
        </div>
      </div>
    );
  }
  return (
    <UnorderedList className="w-full">
      {sshKeys.map(key => (
        <SSHKeyView key={key.fingerprint} userId={userId} sshKey={key} />
      ))}
    </UnorderedList>
  );
}
