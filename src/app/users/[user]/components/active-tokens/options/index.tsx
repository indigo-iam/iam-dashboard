// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { ActiveToken } from "@/models/sites";
import { RevokeToken } from "./revoke-token";
import { useState } from "react";

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
          Revoke
        </Option>
      </Options>
      <RevokeToken token={token} show={show === "REVOKE"} onClose={close} />
    </>
  );
}
