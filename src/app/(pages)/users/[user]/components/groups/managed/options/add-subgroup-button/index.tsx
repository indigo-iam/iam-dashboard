// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import AddSubgroupModal from "./modal";
import { useState } from "react";
import { ScimReference } from "@/models/scim";

type AddSubgroupButtonProps = {
  rootGroup: ScimReference;
  onAdded?: () => void;
};

export default function AddSubgroupButton(
  props: Readonly<AddSubgroupButtonProps>
) {
  const { rootGroup, onAdded } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <button type="button" className="popover-option" onClick={open}>
        Add Subgroup
      </button>
      <AddSubgroupModal
        rootGroup={rootGroup}
        show={show}
        onClose={close}
        onAdded={onAdded}
      />
    </>
  );
}
