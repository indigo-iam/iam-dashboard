// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { GroupRequest } from "@/models/group-requests";
import { useState } from "react";

type ConfirmButtonProps = {
  request: GroupRequest;
};

export default function ConfirmButton() {
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  const action = async () => {
    close();
  };

  return (
    <div className="flex justify-end">
      <Button action="primary-outline" onClick={open}>
        Add Scope Policy
      </Button>
      <ConfirmModal
        show={show}
        onClose={close}
        onConfirm={action}
        title="Create Scope Policy"
      >
        <p>Are you sure you want to add new scope policy?</p>
      </ConfirmModal>
    </div>
  );
}
