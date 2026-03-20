// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

import { Options, Option } from "@/components/options";
import { GroupRequest } from "@/models/group-requests";
import AcceptGroupRequestModal from "./accept-group-request-modal";
import RejectRequestModalProps from "./reject-group-request-modal";

type GroupRequestOptionsProps = {
  request: GroupRequest;
};

export default function GroupRequestOptions(
  props: Readonly<GroupRequestOptionsProps>
) {
  const { request } = props;
  const [show, setShow] = useState<"ACCEPT_REQUEST" | "REJECT_REQUEST">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("ACCEPT_REQUEST")}>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="size-4" />
            <span>Approve</span>
          </div>
        </Option>
        <Option onClick={() => setShow("REJECT_REQUEST")} data-danger>
          <div className="flex items-center gap-2">
            <XCircleIcon className="size-4" />
            <span>Reject</span>
          </div>
        </Option>
      </Options>
      <AcceptGroupRequestModal
        request={request}
        show={show === "ACCEPT_REQUEST"}
        onClose={close}
      />
      <RejectRequestModalProps
        request={request}
        show={show === "REJECT_REQUEST"}
        onClose={close}
      />
    </>
  );
}
