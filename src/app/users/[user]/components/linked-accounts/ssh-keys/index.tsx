// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { CommandLineIcon } from "@heroicons/react/24/outline";

import { SSHKey } from "@/models/indigo-user";
import { Panel } from "@/components/layout";

import AddSSHKeyButton from "./add-button";
import Table from "./table";

type SSHKeysProps = {
  userId: string;
  sshKeys: SSHKey[];
  isMe: boolean;
};

export function SSHKeys(props: Readonly<SSHKeysProps>) {
  const { userId, sshKeys, isMe } = props;
  if (sshKeys.length === 0) {
    return (
      <Panel>
        <h2>SSH Keys</h2>
        <div className="space-y-2">
          <CommandLineIcon className="mx-auto size-12 text-slate-500 dark:text-gray-300" />
          <div className="flex flex-col items-center">
            <p className="mb-2 text-sm">{`Link a public SSH key to ${isMe ? "your" : "the user"} account.`}</p>
            <AddSSHKeyButton userId={userId} />
          </div>
        </div>
      </Panel>
    );
  }
  return (
    <Panel>
      <div className="flex justify-between">
        <h2>SSH Keys</h2>
        <AddSSHKeyButton variant="outline" userId={userId} />
        {sshKeys.length > 0 && <AddSSHKeyButton userId={userId} />}
      </div>
      <Table userId={userId} sshKeys={sshKeys} isMe={isMe} />
    </Panel>
  );
}
