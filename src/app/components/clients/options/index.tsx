// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { PowerIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Options, Option } from "@/components/options";
import { Client } from "@/models/client";
import DeleteClientModal from "./delete-client-modal";
import ToggleStatusModal from "./toggle-status-modal";

type ClientOptionsProps = {
  client: Client;
  isAdmin: boolean;
};

export default function ClientOptions(props: Readonly<ClientOptionsProps>) {
  const { client, isAdmin } = props;
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
            <div className="flex items-center gap-2">
              <PowerIcon className="size-4" />
              <span>Disable</span>
            </div>
          </Option>
        ) : (
          <Option onClick={openToggleStatus}>
            <div className="flex items-center gap-2">
              <PowerIcon className="size-4" />
              <span>Enable</span>
            </div>
          </Option>
        )}
        <Option onClick={openDelete} data-danger>
          <div className="flex items-center gap-2">
            <TrashIcon className="size-4" />
            <span>Delete</span>
          </div>
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
        isAdmin={isAdmin}
        onClose={close}
      />
    </>
  );
}
