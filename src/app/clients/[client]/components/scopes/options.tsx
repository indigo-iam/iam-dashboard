// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

import { Options, Option } from "@/components/options";
import { Client } from "@/models/client";
import DeleteScopeModal from "./delete-scope-modal";

type ScopeOptionsProps = {
  client: Client;
  isAdmin: boolean;
  scope: string;
};

export function ScopeOptions(props: Readonly<ScopeOptionsProps>) {
  const { scope, client, isAdmin } = props;
  const [show, setShow] = useState<"DELETE">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("DELETE")} data-danger>
          <div className="flex items-center gap-2">
            <TrashIcon className="size-4" />
            <span>Delete</span>
          </div>
        </Option>
      </Options>
      <DeleteScopeModal
        scope={scope}
        client={client}
        show={show === "DELETE"}
        onClose={close}
        isAdmin={isAdmin}
      />
    </>
  );
}
