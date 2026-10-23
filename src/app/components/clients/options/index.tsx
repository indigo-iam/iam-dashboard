// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { PowerIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Options, Option } from "@/components/options";
import ToggleStatusModal from "@/app/clients/[client]/components/main/danger-zone/toggle-client-status/modal";
import DeleteClientModal from "@/app/clients/[client]/components/main/danger-zone/delete-client/modal";

type ClientOptionsProps = {
  clientId: string;
  clientName: string;
  clientDescription: string | null;
  active: boolean;
  isAdmin: boolean;
};

export default function ClientOptions(props: Readonly<ClientOptionsProps>) {
  const { clientId, clientName, clientDescription, active, isAdmin } = props;
  const [show, setShow] = useState<"TOGGLE_STATUS" | "DELETE">();
  const openToggleStatus = () => setShow("TOGGLE_STATUS");
  const openDelete = () => setShow("DELETE");
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        {active ? (
          <Option onClick={openToggleStatus} data-danger={active}>
            <PowerIcon className="size-4" />
            <span>Disable</span>
          </Option>
        ) : (
          <Option onClick={openToggleStatus}>
            <PowerIcon className="size-4" />
            <span>Enable</span>
          </Option>
        )}
        <Option onClick={openDelete} data-danger>
          <TrashIcon className="size-4" />
          <span>Delete</span>
        </Option>
      </Options>
      <ToggleStatusModal
        clientId={clientId}
        clientName={clientName}
        clientDescription={clientDescription}
        active={active}
        show={show === "TOGGLE_STATUS"}
        onClose={close}
      />
      <DeleteClientModal
        clientId={clientId}
        clientName={clientName}
        clientDescription={clientDescription}
        show={show === "DELETE"}
        isAdmin={isAdmin}
        onClose={close}
      />
    </>
  );
}
