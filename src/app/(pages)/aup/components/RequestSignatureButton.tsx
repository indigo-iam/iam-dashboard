"use client";
import { Button } from "@/components/Buttons";
import ConfirmModal from "@/components/ConfirmModal";
import { touchAUP } from "@/services/aup";
import { useState } from "react";

export default function RequestSignatureButton() {
  const [isShown, setIsShown] = useState(false);
  const show = () => setIsShown(true);
  const hide = () => setIsShown(false);
  const action = async () => {
    await touchAUP();
    hide();
  };
  return (
    <>
      <ConfirmModal
        show={isShown}
        onClose={hide}
        title="Request Acceptable Usage Policy signature?"
        confirmButtonText="Request AUP signature"
        onConfirm={action}
      >
        <p>
          If you proceed, the acceptance of the AUP will be requested from{" "}
          <b>ALL</b> users at their next login.
        </p>
      </ConfirmModal>
      <Button action="warning" onClick={show}>
        Request AUP signature
      </Button>
    </>
  );
}
