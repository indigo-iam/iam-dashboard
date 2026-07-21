// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import AddSubgroupModal from "./add-subgroup-modal";
import DeleteManagedGroupModal from "./delete-managed-group-modal";

import { useState } from "react";

export type GroupOptionsProps = {
  groupId: string;
  groupName: string;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { groupId, groupName } = props;
  const [show, setShow] = useState<"ADD_SUBGROUP" | "DELETE_GROUP">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("ADD_SUBGROUP")}>Add subgroup</Option>
        <Option onClick={() => setShow("DELETE_GROUP")} data-danger>
          Delete group
        </Option>
      </Options>
      <AddSubgroupModal
        rootGroupId={groupId}
        rootGroupDisplayName={groupName}
        show={show === "ADD_SUBGROUP"}
        onClose={close}
      />
      <DeleteManagedGroupModal
        groupId={groupId}
        groupDisplayName={groupName}
        show={show === "DELETE_GROUP"}
        onClose={close}
      />
    </>
  );
}
