// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { User } from "@/models/scim";
import { useState } from "react";
import AddAttributeModal from "./ modal";

type AddButtonProps = {
  user: User;
};

export default function AddAttributeButton(props: Readonly<AddButtonProps>) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" onClick={openModal}>
        Add Attribute
      </Button>
      <AddAttributeModal show={show} onClose={closeModal} user={user} />
    </>
  );
}
