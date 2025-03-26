// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import ConfirmModal from "@/components/confirm-modal";
import { Scope } from "@/models/client";
import { deleteScope } from "@/services/scopes";
import { useState } from "react";

type DeleteButtonProps = {
  scope: Scope;
};

export default function DeleteButton(props: Readonly<DeleteButtonProps>) {
  const { scope } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const action = async () => {
    await deleteScope(scope);
    close();
  };
  return (
    <>
      <ConfirmModal
        show={show}
        onClose={close}
        title="Delete Scope"
        onConfirm={action}
      >
        <p>
          Are you sure you want to delete the scope <b>{scope.value}</b>?
        </p>
      </ConfirmModal>
      <button
        type="button"
        className="popover-option text-danger"
        onClick={open}
      >
        Delete Scope
      </button>
    </>
  );
}
