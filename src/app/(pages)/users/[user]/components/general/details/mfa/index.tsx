// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { EnableMFAModal } from "./enable-modal";
import { DisableMFAModal } from "./disable-modal";
import { useState } from "react";

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
        <Button className="btn-secondary" onClick={open}>
          Disable MFA
        </Button>
        <DisableMFAModal show={show} onClose={close} />
      </>
    );
  } else {
    return (
      <>
        <Button className="btn-secondary" onClick={open}>
          Enable MFA
        </Button>
        <EnableMFAModal show={show} onClose={close} />
      </>
    );
  }
}
