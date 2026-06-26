// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { toast } from "@/components/toaster";
import { signAUP } from "@/services/users";

type SignInBehalfOfUserProps = {
  userId: string;
  userFormattedName: string;
};

export function SignInBehalfOfUser(props: Readonly<SignInBehalfOfUserProps>) {
  const { userId, userFormattedName } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  async function signAupInBehalfOfUser() {
    const res = await signAUP(userId);
    toast.toast(res);
  }

  return (
    <>
      <Button className="btn-secondary" onClick={open}>
        Sign AUP in behalf of this user
      </Button>
      <ConfirmModal
        show={show}
        onClose={close}
        danger
        title="Sign AUP in behalf of user"
        onConfirm={signAupInBehalfOfUser}
      >
        <p className="py-4">
          Are you sure you want to sign AUP in behalf of user{" "}
          <b>{userFormattedName}</b>?
        </p>
      </ConfirmModal>
    </>
  );
}
