// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { Group } from "@/models/groups";
import AddSubgroupModal from "./add-subgroup-modal";
import DeleteGroupModal from "./delete-group-modal";

import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export type GroupOptionsProps = {
  group: Group;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { group } = props;
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
        rootGroup={group}
        show={show === "ADD_SUBGROUP"}
        onClose={close}
      />
      <DeleteGroupModal
        group={group}
        show={show === "DELETE_GROUP"}
        onClose={close}
      />
    </>
  );
}
