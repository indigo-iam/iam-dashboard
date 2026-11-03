// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import { EnableMFAModal } from "./enable-modal";
import { DisableMFAModal } from "./disable-modal";

type MFAButtonProps = {
  enabled: boolean;
};

export function MFAButton(props: Readonly<MFAButtonProps>) {
  const { enabled } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  if (enabled) {
    return (
      <>
        <Button accent="danger" type="button" onClick={open}>
          Disable MFA
        </Button>
        <DisableMFAModal show={show} onClose={close} />
      </>
    );
  } else {
    return (
      <>
        <Button variant="outline" type="button" onClick={open}>
          Enable MFA
        </Button>
        <EnableMFAModal show={show} onClose={close} />
      </>
    );
  }
}
