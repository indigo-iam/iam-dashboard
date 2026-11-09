// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SSHKey } from "@/models/indigo-user";
import { Panel } from "@/components/layout";

import AddSSHKeyButton from "./add-button";
import Table from "./table";

type SSHKeysProps = {
  userId: string;
  sshKeys: SSHKey[];
};

export function SSHKeys(props: Readonly<SSHKeysProps>) {
  const { userId, sshKeys } = props;
  return (
    <Panel>
      <div className="flex justify-between">
        <h2>SSH Keys</h2>
        <AddSSHKeyButton userId={userId} />
      </div>
      <Table userId={userId} sshKeys={sshKeys} />
    </Panel>
  );
}
