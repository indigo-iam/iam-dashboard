// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ModalProps } from "@/components/modal";
import { User } from "@/models/scim";
import { signAUP } from "@/services/users";

interface SignAUPProps extends ModalProps {
  user: User;
  isMe?: boolean;
}

export function SignAUPModal(props: Readonly<SignAUPProps>) {
  const { user, isMe, ...others } = props;
  const action = async () => {
    signAUP(user.id);
    props.onClose();
  };

  return (
    <ConfirmModal
      {...others}
      title={isMe ? "Resign AUP" : "Sign AUP in behalf of the user"}
      onConfirm={action}
    >
      {isMe ? (
        <p>Are you sure you want to resign the AUP?</p>
      ) : (
        <p>
          Are you sure you want to sign the AUP on behalf of the user{" "}
          <b>{user.displayName}</b>?
        </p>
      )}
    </ConfirmModal>
  );
}
