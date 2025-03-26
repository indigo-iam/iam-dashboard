// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Button } from "@/components/buttons";
import { Group } from "@/models/groups";
import AddMemberModal from "./modal";
import { useState } from "react";

type AddMemberButtonProps = {
  group: Group;
};

export default function AddMemberButton(props: Readonly<AddMemberButtonProps>) {
  const { group } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  return (
    <>
      <Button onClick={openModal} action="primary-outline">
        Add Member
      </Button>
      <AddMemberModal show={show} onClose={closeModal} group={group} />
    </>
  );
}
