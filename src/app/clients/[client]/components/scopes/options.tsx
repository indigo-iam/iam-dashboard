// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { Client } from "@/models/client";
import DeleteScopeModal from "./delete-scope-modal";
import { useState } from "react";

type ScopeOptionsProps = {
  client: Client;
  scope: string;
};

export function ScopeOptions(props: Readonly<ScopeOptionsProps>) {
  const { scope, client } = props;
  const [show, setShow] = useState<"DELETE">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("DELETE")} data-danger>
          Delete
        </Option>
      </Options>
      <DeleteScopeModal
        scope={scope}
        client={client}
        show={show === "DELETE"}
        onClose={close}
      />
    </>
  );
}
