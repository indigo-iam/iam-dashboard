// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import RevokeGroupManagerModal from "./revoke-group-manager-modal";
import { useState } from "react";
import { NoSymbolIcon } from "@heroicons/react/24/outline";

type ManagerOptionsProps = {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  groupId: string;
  groupName: string;
  groupDescription?: string | null;
};

export default function ManagerOptions(props: Readonly<ManagerOptionsProps>) {
  const {
    userId,
    userFormattedName,
    userEmail,
    groupId,
    groupName,
    groupDescription,
  } = props;
  const [show, setShow] = useState<"REVOKE_MANAGER">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("REVOKE_MANAGER")} data-danger>
          <div className="flex items-center gap-2">
            <NoSymbolIcon className="size-4" />
            <span>Revoke user</span>
          </div>
        </Option>
      </Options>
      <RevokeGroupManagerModal
        userId={userId}
        userFormattedName={userFormattedName}
        userEmail={userEmail}
        groupId={groupId}
        groupName={groupName}
        groupDescription={groupDescription}
        show={show === "REVOKE_MANAGER"}
        onClose={close}
      />
    </>
  );
}
