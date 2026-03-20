// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { Option, Options } from "@/components/options";
import RemoveMemberFromGroupModal from "./remove-member-modal";
import { ScimReference } from "@/models/scim";
import { Group } from "@/models/groups";

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
          <div className="flex items-center gap-1">
            <ArrowRightStartOnRectangleIcon className="size-4" />
            <span>Remove from group</span>
          </div>
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
