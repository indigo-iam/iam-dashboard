// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { User } from "@/models/scim";
import { Group } from "@/models/groups";
import RevokeGroupManagerModal from "./revoke-group-manager-modal";
import { useState } from "react";

type ManagerOptionsProps = {
  manager: User;
  group: Group;
};

export default function ManagerOptions(props: Readonly<ManagerOptionsProps>) {
  const { manager, group } = props;
  const [show, setShow] = useState<"REVOKE_MANAGER">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("REVOKE_MANAGER")} data-danger>
          Revoke
        </Option>
      </Options>
      <RevokeGroupManagerModal
        user={manager}
        group={group}
        show={show === "REVOKE_MANAGER"}
        onClose={close}
      />
    </>
  );
}
