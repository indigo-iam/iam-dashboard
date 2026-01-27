// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Option, Options } from "@/components/options";
import RemoveMemberFromGroupModal from "./remove-member-modal";
import { User } from "@/models/scim";
import { Group } from "@/models/groups";
import { useState } from "react";

type MemberOptionsProps = {
  user: User;
  group: Group;
};

export default function MemberOptions(props: Readonly<MemberOptionsProps>) {
  const { user, group } = props;
  const [show, setShow] = useState<"REMOVE_MEMBER">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("REMOVE_MEMBER")} data-danger>
          Remove from group
        </Option>
      </Options>
      <RemoveMemberFromGroupModal
        onClose={close}
        user={user}
        group={group}
        show={show === "REMOVE_MEMBER"}
      />
    </>
  );
}
