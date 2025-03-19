"use client";
import { ScopePolicy } from "@/models/scope-policies";
import DeletePolicyModal from "./modal";
import { useState } from "react";

type DeletePolicyProps = {
  policy: ScopePolicy;
};

export default function DeletePolicy(props: Readonly<DeletePolicyProps>) {
  const { policy } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <button
        type="button"
        className="popover-option text-danger"
        onClick={open}
      >
        Delete Policy
      </button>
      <DeletePolicyModal show={show} onClose={close} policy={policy} />
    </>
  );
}
