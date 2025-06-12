// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { Registration } from "@/models/registration";
import ApproveRegistrationRequestModal from "./approve-registration-request-modal";
import RejectRegistrationRequestModal from "./reject-registration-request-modal";
import { useState } from "react";

type RegistrationRequestOptionsProps = {
  request: Registration;
};

export default function RegistrationRequestsOptions(
  props: Readonly<RegistrationRequestOptionsProps>
) {
  const { request } = props;
  const [show, setShow] = useState<"APPROVE_REQUEST" | "REJECT_REQUEST">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("APPROVE_REQUEST")}>Approve</Option>
        <Option onClick={() => setShow("REJECT_REQUEST")} danger>
          Reject
        </Option>
      </Options>
      <ApproveRegistrationRequestModal
        request={request}
        show={show === "APPROVE_REQUEST"}
        onClose={close}
      />
      <RejectRegistrationRequestModal
        request={request}
        show={show === "REJECT_REQUEST"}
        onClose={close}
      />
    </>
  );
}
