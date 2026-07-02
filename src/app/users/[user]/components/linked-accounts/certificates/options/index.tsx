// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { LinkSlashIcon } from "@heroicons/react/24/outline";
import { Option, Options } from "@/components/options";
import { UnlinkCertificateModal } from "./unlink-certificate";
import { Certificate } from "@/models/indigo-user";

type CertificateOptionsProps = {
  userId: string;
  certificate: Certificate;
};

export default function CertificateOptions(
  props: Readonly<CertificateOptionsProps>
) {
  const { userId, certificate } = props;
  const [show, setShow] = useState<"UNLINK_CERTIFICATE">();
  const close = () => setShow(undefined);
  return (
    <Options>
      <Option data-danger onClick={() => setShow("UNLINK_CERTIFICATE")}>
        <div className="flex items-center gap-2">
          <LinkSlashIcon className="size-5" />
          <span>Unlink certificate</span>
        </div>
      </Option>
      <UnlinkCertificateModal
        show={show === "UNLINK_CERTIFICATE"}
        onClose={close}
        userId={userId}
        certificate={certificate}
      />
    </Options>
  );
}
