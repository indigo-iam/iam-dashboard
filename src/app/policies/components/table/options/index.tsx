// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

import { Options, Option } from "@/components/options";
import { ScopePolicy } from "@/models/scope-policies";
import DeletePolicyModal from "./delete-policy-modal";

type PolicyOptionsProps = {
  policy: ScopePolicy;
};

export default function PolicyOptions(props: Readonly<PolicyOptionsProps>) {
  const { policy } = props;
  const [show, setShow] = useState<"DELETE_POLICY">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("DELETE_POLICY")} data-danger>
          <div className="flex items-center gap-2">
            <TrashIcon className="size-4" />
            <span>Delete</span>
          </div>
        </Option>
      </Options>
      <DeletePolicyModal
        show={show === "DELETE_POLICY"}
        onClose={close}
        policy={policy}
      />
    </>
  );
}
