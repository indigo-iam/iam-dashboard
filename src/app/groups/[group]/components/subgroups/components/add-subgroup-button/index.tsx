// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import AddSubgroupModal from "@/app/groups/(overview)/components/table/options/add-subgroup-modal";
import { Button } from "@/components/buttons";

type AddSubgroupButtonProps = {
  rootGroupId: string;
  rootGroupName: string;
};

export default function AddSubgroupButton(
  props: Readonly<AddSubgroupButtonProps>
) {
  const { rootGroupId, rootGroupName } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button variant="outline" type="button" onClick={open}>
        Add Subgroup
      </Button>
      <AddSubgroupModal
        rootGroupId={rootGroupId}
        rootGroupName={rootGroupName}
        show={show}
        onClose={close}
      />
    </>
  );
}
