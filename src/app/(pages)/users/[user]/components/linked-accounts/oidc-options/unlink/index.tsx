// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import ConfirmUnlinkUserModal from "./modal";
import { OidcId } from "@/models/indigo-user";

export type UnlinkOidcAccountProps = {
  oidcId: OidcId;
};

export default function UnlinkOidcAccount(
  props: Readonly<UnlinkOidcAccountProps>
) {
  const { oidcId } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  return (
    <>
      <button
        type="button"
        title="Unlink Account"
        className="popover-option-danger"
        onClick={open}
      >
        Unlink Account
      </button>
      <ConfirmUnlinkUserModal oidcId={oidcId} show={show} onClose={close} />
    </>
  );
}
