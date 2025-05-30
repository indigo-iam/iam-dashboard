// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Button } from "@/components/buttons";
import { User } from "@/models/scim";
import AddSSHKeyModal from "./modal";
import { useState } from "react";

type AddSSHKeyButtonProps = {
  user: User;
};

export default function AddSSHKeyButton(props: Readonly<AddSSHKeyButtonProps>) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Button className="btn-secondary" onClick={openModal}>
        Add SSH Key
      </Button>
      <AddSSHKeyModal show={show} onClose={closeModal} user={user} />
    </>
  );
}
