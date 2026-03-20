// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/buttons";
import { Group } from "@/models/groups";
import AssignGroupManagerModal from "./modal";

type AssignGroupManagerButtonProps = {
  group: Group;
};

export default function AssignGroupManagerButton(
  props: Readonly<AssignGroupManagerButtonProps>
) {
  const { group } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  return (
    <>
      <Button
        className="btn-secondary flex items-center gap-1"
        onClick={openModal}
      >
        <UserGroupIcon className="size-4" />
        <span>Assign manager</span>
      </Button>
      <AssignGroupManagerModal show={show} onClose={closeModal} group={group} />
    </>
  );
}
