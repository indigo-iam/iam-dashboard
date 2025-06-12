// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { Client } from "@/models/client";
import DeleteClientModal from "./delete-client-modal";
import { useState } from "react";

type ClientOptionsProps = {
  client: Client;
};

export default function ClientOptions(props: Readonly<ClientOptionsProps>) {
  const { client } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Options>
        <Option onClick={open} danger>
          Delete
        </Option>
      </Options>
      <DeleteClientModal client={client} show={show} onClose={close} />
    </>
  );
}
