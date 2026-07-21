// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ConfirmModal from "@/components/confirm-modal";
import { ModalProps } from "@/components/modal";
import { useProgressBar } from "@/components/progress-bar";
import { toast } from "@/components/toaster";
import { deleteUserLabel } from "@/services/users";

type DeleteLabelModalProps = ModalProps & {
  userId: string;
  userFormattedName: string;
  name: string;
  prefix: string;
  value: string | null;
};

export function DeleteLabelModal(props: Readonly<DeleteLabelModalProps>) {
  const {
    show, //
    onClose,
    userId,
    userFormattedName,
    name,
    prefix,
    value,
  } = props;

  const { startTransition } = useProgressBar();

  async function deleteLabel() {
    startTransition(async () => {
      const res = await deleteUserLabel(userId, prefix, name);
      if (res) {
        toast.toast(res);
      }
      onClose();
    });
  }

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title="Delete user label?"
      confirmButtonText="Delete"
      onConfirm={deleteLabel}
      danger
    >
      <p className="text-center">
        Are you sure you want to delete the following label from user{" "}
        <b>{userFormattedName}</b>?
      </p>
      <div className="flex w-full justify-center">
        <div className="flex flex-col items-start rounded border-l-4 border-l-gray-400 bg-gray-100 p-4">
          <span className="grow text-xs break-all">{prefix}</span>
          <span className="font-medium break-all text-gray-950 dark:text-gray-400">
            {name}
          </span>
          <span className="text-sm break-all">{value}</span>
        </div>
      </div>
    </ConfirmModal>
  );
}
