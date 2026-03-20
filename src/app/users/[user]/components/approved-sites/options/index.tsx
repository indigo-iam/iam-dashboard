// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

import { Options, Option } from "@/components/options";
import { Site } from "@/models/sites";
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
          <div className="flex items-center gap-2">
            <XCircleIcon className="size-5" />
            <span>Revoke</span>
          </div>
        </Option>
      </Options>
      <RevokeSite site={site} show={show === "REVOKE"} onClose={close} />
    </>
  );
}
