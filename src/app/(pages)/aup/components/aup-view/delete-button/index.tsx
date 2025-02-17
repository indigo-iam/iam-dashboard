"use client";
import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { deleteAUP } from "@/services/aup";
import { XMarkIcon } from "@heroicons/react/16/solid";
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
      <Button action="danger" icon={<XMarkIcon />} onClick={show}>
        Delete AUP
      </Button>
    </>
  );
}
