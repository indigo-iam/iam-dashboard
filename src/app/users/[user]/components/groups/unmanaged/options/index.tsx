// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Option, Options } from "@/components/options";
import { ScimReference, User } from "@/models/scim";
import RemoveMembershipModal from "./remove-membership-modal";
import { useState } from "react";

export type GroupOptionsProps = {
  user: User;
  groupRef: ScimReference;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { user, groupRef } = props;
  const [show, setShow] = useState<"REMOVE_MEMBERSHIP">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("REMOVE_MEMBERSHIP")} danger>
          Leave
        </Option>
      </Options>
      <RemoveMembershipModal
        user={user}
        groupRef={groupRef}
        show={show === "REMOVE_MEMBERSHIP"}
        onClose={close}
      />
    </>
  );
}
