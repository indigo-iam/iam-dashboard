// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { LinkSlashIcon } from "@heroicons/react/24/outline";

import { Option, Options } from "@/components/options";
import { Certificate } from "@/models/indigo-user";

type CertificateOptionsProps = {
  cert: Certificate;
};

export default function CertificateOptions(
  props: Readonly<CertificateOptionsProps>
) {
  const [_, setShow] = useState<"DELETE_CERTIFICATE">();
  return (
    <>
      <Options>
        <Option onClick={() => setShow("DELETE_CERTIFICATE")} data-danger>
          <div className="flex items-center gap-2">
            <LinkSlashIcon className="size-5" />
            <span>Unlink certificate</span>
          </div>
        </Option>
      </Options>
    </>
  );
}
