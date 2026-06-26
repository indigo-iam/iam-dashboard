// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Option, Options } from "@/components/options";
import { ScimReference } from "@/models/scim";
import RemoveMembershipModal from "./remove-membership-modal";

export type GroupOptionsProps = {
  userRef: ScimReference;
  groupRef: ScimReference;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { userRef, groupRef } = props;
  const [show, setShow] = useState<"REMOVE_MEMBERSHIP">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("REMOVE_MEMBERSHIP")} data-danger>
          Leave
        </Option>
      </Options>
      <RemoveMembershipModal
        userRef={userRef}
        groupRef={groupRef}
        show={show === "REMOVE_MEMBERSHIP"}
        onClose={close}
      />
    </>
  );
}
