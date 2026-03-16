// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Options, Option } from "@/components/options";
import { Client } from "@/models/client";
import DeleteClientModal from "./delete-client-modal";
import ToggleStatusModal from "./toggle-status-modal";

type ClientOptionsProps = {
  client: Client;
};

export default function ClientOptions(props: Readonly<ClientOptionsProps>) {
  const { client } = props;
  const { active } = client;
  const [show, setShow] = useState<"TOGGLE_STATUS" | "DELETE">();
  const openToggleStatus = () => setShow("TOGGLE_STATUS");
  const openDelete = () => setShow("DELETE");
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        {active ? (
          <Option onClick={openToggleStatus} data-danger={active}>
            Disable
          </Option>
        ) : (
          <Option onClick={openToggleStatus}>Enable</Option>
        )}
        <Option onClick={openDelete} data-danger>
          Delete
        </Option>
      </Options>
      <ToggleStatusModal
        client={client}
        show={show === "TOGGLE_STATUS"}
        onClose={close}
      />
      <DeleteClientModal
        client={client}
        show={show === "DELETE"}
        onClose={close}
      />
    </>
  );
}
