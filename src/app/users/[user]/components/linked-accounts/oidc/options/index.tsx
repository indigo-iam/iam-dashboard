// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { LinkSlashIcon } from "@heroicons/react/24/outline";

import { Option, Options } from "@/components/options";
import { OidcId } from "@/models/indigo-user";
import UnlinkAccountModal from "./unlink-modal";

type OidcOptionsProps = {
  oidcId: OidcId;
};

export default function OidcOptions(props: Readonly<OidcOptionsProps>) {
  const { oidcId } = props;
  const [show, setShow] = useState<"UNLINK_ACCOUNT">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("UNLINK_ACCOUNT")} data-danger>
          <div className="flex items-center gap-2">
            <LinkSlashIcon className="size-5" />
            <span>Unlink account</span>
          </div>
        </Option>
      </Options>
      <UnlinkAccountModal
        oidcId={oidcId}
        show={show === "UNLINK_ACCOUNT"}
        onClose={close}
      />
    </>
  );
}
