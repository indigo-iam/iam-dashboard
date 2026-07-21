// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { Option, Options } from "@/components/options";
import RemoveMemberFromGroupModal from "./remove-member-modal";

type MemberOptionsProps = {
  userId: string;
  userDisplay: string;
  groupId: string;
  groupDisplay: string;
  groupDescription?: string | null;
};

export default function MemberOptions(props: Readonly<MemberOptionsProps>) {
  const { userId, userDisplay, groupDisplay, groupId, groupDescription } =
    props;
  const [show, setShow] = useState<"REMOVE_MEMBER">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("REMOVE_MEMBER")} data-danger>
          <div className="flex items-center gap-2">
            <ArrowRightStartOnRectangleIcon className="size-4" />
            <span>Remove member</span>
          </div>
        </Option>
      </Options>
      <RemoveMemberFromGroupModal
        onClose={close}
        userId={userId}
        userDisplay={userDisplay}
        groupId={groupId}
        groupDisplay={groupDisplay}
        groupDescription={groupDescription}
        show={show === "REMOVE_MEMBER"}
      />
    </>
  );
}
