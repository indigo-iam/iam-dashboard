// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { Warning } from "@/components/notices";
import { toast } from "@/components/toaster";
import { deleteAUP } from "@/services/aup";

export default function DeleteButton() {
  const [isShown, setIsShown] = useState(false);
  const show = () => setIsShown(true);
  const hide = () => setIsShown(false);
  const handleConfirm = async () => {
    const res = await deleteAUP();
    toast.toast(res);
    hide();
  };
  return (
    <>
      <ConfirmModal
        show={isShown}
        onClose={hide}
        onConfirm={handleConfirm}
        title="Delete the Acceptable Usage Policy for this organization?"
        danger={true}
        confirmButtonText="Delete"
      >
        <p>
          Are you sure you want to delete the Acceptable Usage Policy for this
          organization?
        </p>
        <Warning>
          If you proceed, the acceptance of the AUP will not be requested for
          new users at registration time.
        </Warning>
      </ConfirmModal>
      <Button className="btn-danger" onClick={show}>
        Delete AUP
      </Button>
    </>
  );
}
