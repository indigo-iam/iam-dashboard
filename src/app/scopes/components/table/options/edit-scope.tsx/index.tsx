// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Scope } from "@/models/client";
import { useState } from "react";
import { EditScopeModal } from "./modal";

type EditScopeProps = {
  scope: Scope;
};

export default function EditScope(props: Readonly<EditScopeProps>) {
  const { scope } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  return (
    <>
      <button type="button" className="popover-option" onClick={open}>
        Edit Scope
      </button>
      <EditScopeModal scope={scope} show={show} onClose={close} />
    </>
  );
}
