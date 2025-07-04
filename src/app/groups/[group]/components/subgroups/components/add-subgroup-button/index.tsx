// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import AddSubgroupModal from "@/app/groups/components/table/options/add-subgroup-modal";
import { Button } from "@/components/buttons";
import { Group } from "@/models/groups";
import { useState } from "react";

type AddSubgroupButtonProps = {
  group: Group;
};

export default function AddSubgroupButton(
  props: Readonly<AddSubgroupButtonProps>
) {
  const { group } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" type="button" onClick={open}>
        Add Subgroup
      </Button>
      <AddSubgroupModal rootGroup={group} show={show} onClose={close} />
    </>
  );
}
