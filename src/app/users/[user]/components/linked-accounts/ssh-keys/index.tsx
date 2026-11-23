// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SSHKey } from "@/models/indigo-user";
import { Panel } from "@/components/layout";

import AddSSHKeyButton from "./add-button";
import Table from "./table";
import { CommandLineIcon } from "@heroicons/react/24/outline";

type SSHKeysProps = {
  userId: string;
  sshKeys: SSHKey[];
  isMe?: boolean;
};

export function SSHKeys(props: Readonly<SSHKeysProps>) {
  const { userId, sshKeys, isMe } = props;
  if (sshKeys.length === 0) {
    return (
      <Panel>
        <h2>SSH Keys</h2>
        <div className="flex flex-col items-center">
          <CommandLineIcon className="size-12" />
          <p className="mb-2 text-sm">{`Link a public SSH key to ${isMe ? "your" : "the user"} account.`}</p>
          <AddSSHKeyButton userId={userId} />
        </div>
      </Panel>
    );
  }
  return (
    <Panel>
      <div className="flex justify-between">
        <h2>SSH Keys</h2>
        <AddSSHKeyButton variant="outline" userId={userId} />
      </div>
      <Table userId={userId} sshKeys={sshKeys} />
    </Panel>
  );
}
