// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Option, Options } from "@/components/options";
import RemoveMemberFromGroupModal from "./remove-member-modal";
import { ScimReference } from "@/models/scim";
import { Group } from "@/models/groups";
import { useState } from "react";

type MemberOptionsProps = {
  userRef: ScimReference;
  group: Group;
};

export default function MemberOptions(props: Readonly<MemberOptionsProps>) {
  const { userRef, group } = props;
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
        userRef={userRef}
        group={group}
        show={show === "REMOVE_MEMBER"}
      />
    </>
  );
}
