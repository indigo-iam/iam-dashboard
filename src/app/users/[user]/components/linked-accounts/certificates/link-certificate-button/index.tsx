// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import LinkCertificateModal from "./modal";

type LinkButtonProps = {
  userId: string;
  userName: string;
  isAdmin: boolean;
};

export default function LinkCertificateButton(
  props: Readonly<LinkButtonProps>
) {
  const { userId, userName, isAdmin } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button variant="outline" type="button" onClick={open}>
        Link certificate
      </Button>
      <LinkCertificateModal
        show={show}
        onClose={close}
        userId={userId}
        userName={userName}
        isAdmin={isAdmin}
      />
    </>
  );
}
