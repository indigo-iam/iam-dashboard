// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

import { Options, Option } from "@/components/options";
import { ScimReference } from "@/models/scim";
import DeleteSubgroupModal from "./delete-subgroup-modal";

type SubgroupOptionsProps = {
  groupRef: ScimReference;
};

export default function SubgroupOptions(props: Readonly<SubgroupOptionsProps>) {
  const { groupRef } = props;
  const [show, setShow] = useState<"DELETE_SUBGROUP">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("DELETE_SUBGROUP")} data-danger>
          <div className="flex items-center gap-2">
            <TrashIcon className="size-4" />
          </div>
          <span>Delete</span>
        </Option>
      </Options>
      <DeleteSubgroupModal
        groupRef={groupRef}
        show={show === "DELETE_SUBGROUP"}
        onClose={close}
      />
    </>
  );
}
