// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { GroupRequest } from "@/models/group-requests";
import DeleteGroupRequestModal from "./delete-group-request-modal";
import RejectRequestModalProps from "./reject-group-request-modal";
import { useState } from "react";

type GroupRequestOptionsProps = {
  request: GroupRequest;
};

export default function GroupRequestOptions(
  props: Readonly<GroupRequestOptionsProps>
) {
  const { request } = props;
  const [show, setShow] = useState<"DELETE_REQUEST" | "REJECT_REQUEST">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("DELETE_REQUEST")} danger>
          Delete
        </Option>
        <Option onClick={() => setShow("REJECT_REQUEST")} danger>
          Reject
        </Option>
      </Options>
      <DeleteGroupRequestModal
        request={request}
        show={show === "DELETE_REQUEST"}
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
