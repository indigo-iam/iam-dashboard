// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Options, Option } from "@/components/options";
import { GroupRequest } from "@/models/group-requests";
import { User } from "@/models/scim";
import RevokeRequestModal from "./revoke-request-modal";

export type GroupRequestOptionProps = {
  user: User;
  request: GroupRequest;
};

export function GroupRequestOptions(props: Readonly<GroupRequestOptionProps>) {
  const { user, request } = props;
  const [show, setShow] = useState<"REVOKE">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("REVOKE")} data-danger>
          <div className="flex items-center gap-2">
            <XMarkIcon className="size-5" />
            <span className="inline-block">Revoke request</span>
          </div>
        </Option>
      </Options>
      <RevokeRequestModal
        user={user}
        request={request}
        show={show === "REVOKE"}
        onClose={close}
      />
    </>
  );
}
