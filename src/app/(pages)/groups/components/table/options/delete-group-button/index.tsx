"use client";
import DeleteGroupModal from "./DeleteGroupModal";
import { useState } from "react";
import { ScimReference } from "@/models/scim";
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

  const groupRef: ScimReference = {
    display: group.displayName,
    value: group.id,
    $ref: `/groups/${group.id}`,
  };

  return (
    <>
      <button
        type="button"
        className="popover-option text-danger"
        onClick={open}
      >
        Delete Group
      </button>
      <DeleteGroupModal
        groupRef={groupRef}
        show={show}
        onClose={close}
        onDeleted={onDeleted}
      />
    </>
  );
}
