// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Option, Options } from "@/components/options";
import RemoveMembershipModal from "./remove-membership-modal";

export type GroupOptionsProps = {
  userId: string;
  userDisplay: string;
  groupId: string;
  groupDisplay: string;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { userId, userDisplay, groupId, groupDisplay } = props;
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
        userId={userId}
        userDisplay={userDisplay}
        groupId={groupId}
        groupDisplay={groupDisplay}
        show={show === "REMOVE_MEMBERSHIP"}
        onClose={close}
      />
    </>
  );
}
