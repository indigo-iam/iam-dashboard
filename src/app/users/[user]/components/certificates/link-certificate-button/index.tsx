// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { User } from "@/models/scim";
import { useState } from "react";
import LinkCertificateModal from "./modal";

type LinkButtonProps = {
  user: User;
};

export default function LinkCertificateButton(
  props: Readonly<LinkButtonProps>
) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button onClick={open} className="btn-secondary">
        Request certificate linking
      </Button>
      <LinkCertificateModal show={show} onClose={close} user={user} />
    </>
  );
}
