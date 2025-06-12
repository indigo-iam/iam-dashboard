// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { deleteAUP } from "@/services/aup";
import { useState } from "react";

export default function DeleteButton() {
  const [isShown, setIsShown] = useState(false);
  const show = () => setIsShown(true);
  const hide = () => setIsShown(false);
  const handleConfirm = async () => {
    await deleteAUP();
    hide();
  };
  return (
    <>
      <ConfirmModal
        show={isShown}
        onClose={hide}
        onConfirm={handleConfirm}
        title="Delete the Acceptable Usage Policy for this organization?"
      >
        If you proceed, the acceptance of the AUP will not be requested for new
        users at registration time.
      </ConfirmModal>
      <Button className="btn-danger" onClick={show}>
        Delete AUP
      </Button>
    </>
  );
}
