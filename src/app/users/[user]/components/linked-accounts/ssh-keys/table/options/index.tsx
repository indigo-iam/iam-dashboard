// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { SSHKey } from "@/models/indigo-user";
import { Options, Option } from "@/components/options";
import DeleteSSHKeyModal from "./delete-key-modal";
import { useState } from "react";

type SSHKeysOptionsProps = {
  userId: string;
  userFormattedName: string;
  sshKey: SSHKey;
};

export default function SSHKeysOptions(props: Readonly<SSHKeysOptionsProps>) {
  const { userId, userFormattedName, sshKey } = props;
  const [show, setShow] = useState<"DELETE">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("DELETE")} data-danger>
          Delete
        </Option>
      </Options>
      <DeleteSSHKeyModal
        userId={userId}
        userFormattedName={userFormattedName}
        sshKey={sshKey}
        show={show === "DELETE"}
        onClose={close}
      />
    </>
  );
}
