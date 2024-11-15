"use client";
import ConfirmModal from "@/components/ConfirmModal";
import { useState } from "react";

type UnlinkProps = {};

export default function Unlink(props: Readonly<UnlinkProps>) {
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <button
        type="button"
        className="popover-option text-danger"
        onClick={open}
        title="Unlink"
      >
        Unlink
      </button>
      <ConfirmModal show={show} onClose={close} />
    </>
  );
}
