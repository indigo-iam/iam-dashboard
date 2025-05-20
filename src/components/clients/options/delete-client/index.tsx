// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import DeleteClientModal from "./modal";
import { useState } from "react";
import { Client } from "@/models/client";

type DeleteClientProps = {
  client: Client;
  onDeleted?: () => void;
};

export default function DeleteClient(props: Readonly<DeleteClientProps>) {
  const { client, onDeleted } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <button className="popover-option-danger" onClick={open}>
        Delete Client
      </button>
      <DeleteClientModal
        client={client}
        show={show}
        onClose={close}
        onDeleted={onDeleted}
      />
    </>
  );
}
