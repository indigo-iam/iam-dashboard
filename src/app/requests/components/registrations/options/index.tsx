// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

import { Options, Option } from "@/components/options";
import { Registration } from "@/models/registration";
import ApproveRegistrationRequestModal from "./approve-registration-request-modal";
import RejectRegistrationRequestModal from "./reject-registration-request-modal";

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
        <Option onClick={() => setShow("APPROVE_REQUEST")}>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="size-5" />
            <span>Approve</span>
          </div>
        </Option>
        <Option onClick={() => setShow("REJECT_REQUEST")} data-danger>
          <div className="flex items-center gap-2">
            <XCircleIcon className="size-5" />
            <span>Reject</span>
          </div>
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
