// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { BackspaceIcon } from "@heroicons/react/24/outline";

import { Options, Option } from "@/components/options";
import { ActiveToken } from "@/models/sites";
import { RevokeToken } from "./revoke-token";

type ActiveTokenOptionsProps = {
  token: ActiveToken;
};

export function ActiveTokenOptions(props: Readonly<ActiveTokenOptionsProps>) {
  const { token } = props;
  const [show, setShow] = useState<"REVOKE">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("REVOKE")} data-danger>
          <div className="flex items-center gap-2">
            <BackspaceIcon className="size-5" />
            <span>Revoke</span>
          </div>
        </Option>
      </Options>
      <RevokeToken token={token} show={show === "REVOKE"} onClose={close} />
    </>
  );
}
