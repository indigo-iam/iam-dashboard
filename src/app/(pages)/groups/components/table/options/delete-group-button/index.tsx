"use client";
import DeleteGroupModal from "./modal";
import { useState } from "react";
import { Group } from "@/models/groups";

type DeleteGroupButtonProps = {
  group: Group;
  onDeleted?: () => void;
};

export default function DeleteGroupButton(
  props: Readonly<DeleteGroupButtonProps>
) {
  const { group, onDeleted } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  return (
    <>
      <button
        type="button"
        className="popover-option text-danger"
        onClick={open}
        data-test="delete"
      >
        Delete Group
      </button>
      <DeleteGroupModal
        group={group}
        show={show}
        onClose={close}
        onDeleted={onDeleted}
      />
    </>
  );
}
