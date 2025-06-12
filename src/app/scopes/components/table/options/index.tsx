// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { Scope } from "@/models/client";
import EditScopeModal from "./edit-scope-modal";
import DeleteScopeModal from "./delete-scope-modal";
import { useState } from "react";

type ScopeOptionsProps = {
  scope: Scope;
};

export default function ScopeOptions(props: Readonly<ScopeOptionsProps>) {
  const { scope } = props;
  const [show, setShow] = useState<"EDIT" | "DELETE">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("EDIT")}>Edit</Option>
        <Option onClick={() => setShow("DELETE")} data-danger>
          Delete
        </Option>
      </Options>
      <EditScopeModal scope={scope} show={show === "EDIT"} onClose={close} />
      <DeleteScopeModal
        scope={scope}
        show={show === "DELETE"}
        onClose={close}
      />
    </>
  );
}
