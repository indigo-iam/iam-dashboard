// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import AddSubgroupModal from "./add-subgroup-modal";
import DeleteGroupModal from "./delete-group-modal";

import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export type GroupOptionsProps = {
  groupId: string;
  groupName: string;
  groupDescription?: string | null;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { groupId, groupName, groupDescription } = props;
  const [show, setShow] = useState<"ADD_SUBGROUP" | "DELETE_GROUP">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("ADD_SUBGROUP")}>
          <div className="flex items-center gap-2">
            <PlusCircleIcon className="size-4" />
            <span className="inline-block">Add subgroup</span>
          </div>
        </Option>
        <Option
          onClick={() => setShow("DELETE_GROUP")}
          data-danger
          data-testid="delete-group-opt"
        >
          <div className="flex items-center gap-2">
            <TrashIcon className="size-4" />
            <span className="inline-block">Delete group</span>
          </div>
        </Option>
      </Options>
      <AddSubgroupModal
        rootGroupId={groupId}
        rootGroupName={groupName}
        show={show === "ADD_SUBGROUP"}
        onClose={close}
      />
      <DeleteGroupModal
        groupId={groupId}
        groupName={groupName}
        groupDescription={groupDescription}
        show={show === "DELETE_GROUP"}
        onClose={close}
      />
    </>
  );
}
