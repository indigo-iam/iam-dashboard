// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import { Button } from "@/components/buttons";
import { ScopePolicy } from "@/models/scope-policies";

import DeletePolicyModal from "../../table/options/delete-policy-modal";

function redirectToPolicies() {
  redirect("/policies");
}

type DeletePolicyButtonProps = {
  policy: ScopePolicy;
};

export function DeletePolicyButton(props: Readonly<DeletePolicyButtonProps>) {
  const { policy } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button accent="danger" type="button" onClick={open}>
        Delete
      </Button>
      <DeletePolicyModal
        show={show}
        onClose={close}
        policy={policy}
        onDeleted={redirectToPolicies}
      />
    </>
  );
}
