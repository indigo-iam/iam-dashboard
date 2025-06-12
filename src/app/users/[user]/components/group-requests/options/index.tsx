// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { User } from "@/models/scim";
import { GroupRequest } from "@/models/group-requests";
import DeleteGroupRequestModal from "./delete-group-request-modal";
import { useState } from "react";

type GroupRequestOptionsProps = {
  user: User;
  isMe: boolean;
  groupRequest: GroupRequest;
};

export default function GroupRequestOptions(
  props: Readonly<GroupRequestOptionsProps>
) {
  const { user, isMe, groupRequest } = props;
  const [show, setShow] = useState<"DELETE">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("DELETE")} danger>
          Delete
        </Option>
      </Options>
      <DeleteGroupRequestModal
        groupRequest={groupRequest}
        user={user}
        isMe={isMe}
        show={show === "DELETE"}
        onClose={close}
      />
    </>
  );
}
