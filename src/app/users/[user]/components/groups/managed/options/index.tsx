// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { ScimReference } from "@/models/scim";
import AddSubgroupModal from "./add-subgroup-modal";
import DeleteGroupModal from "./delete-group-modal";
import { useState } from "react";

export type GroupOptionsProps = {
  groupRef: ScimReference;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { groupRef } = props;
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
        rootGroup={groupRef}
        show={show === "ADD_SUBGROUP"}
        onClose={close}
      />
      <DeleteGroupModal
        groupRef={groupRef}
        show={show === "DELETE_GROUP"}
        onClose={close}
      />
    </>
  );
}
