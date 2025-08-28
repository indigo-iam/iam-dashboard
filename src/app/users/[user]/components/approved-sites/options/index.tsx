// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { Site } from "@/models/sites";
import { useState } from "react";
import { RevokeSite } from "./revoke-site";

type ActiveSiteOptionsProps = {
  site: Site;
};

export function ApprovedSiteOptions(props: Readonly<ActiveSiteOptionsProps>) {
  const { site } = props;
  const [show, setShow] = useState<"REVOKE">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("REVOKE")} data-danger>
          Revoke
        </Option>
      </Options>
      <RevokeSite site={site} show={show === "REVOKE"} onClose={close} />
    </>
  );
}
