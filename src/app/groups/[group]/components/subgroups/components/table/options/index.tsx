// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { ScimReference } from "@/models/scim";
import DeleteSubgroupModal from "./delete-subgroup-modal";
import { useState } from "react";

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
          Delete subgroup
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
