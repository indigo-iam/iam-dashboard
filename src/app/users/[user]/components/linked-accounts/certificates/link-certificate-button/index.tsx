// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { useState } from "react";
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
      <Button onClick={open} className="btn-secondary">
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
