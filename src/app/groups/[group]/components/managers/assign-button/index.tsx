// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Group } from "@/models/groups";
import AssignGroupManagerModal from "./modal";
import { useState } from "react";

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
      <Button className="btn-secondary" onClick={openModal}>
        Assign Group Manager
      </Button>
      <AssignGroupManagerModal show={show} onClose={closeModal} group={group} />
    </>
  );
}
