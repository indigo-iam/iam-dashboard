// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Option, Options } from "@/components/options";
import { SamlId } from "@/models/indigo-user";
import UnlinkAccountModal from "./unlink-modal";
import { useState } from "react";

type SAMLOptionsProps = {
  samlId: SamlId;
};

export default function SAMLOptions(props: Readonly<SAMLOptionsProps>) {
  const { samlId } = props;
  const [show, setShow] = useState<"UNLINK_ACCOUNT">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("UNLINK_ACCOUNT")} danger>
          Unlink Account
        </Option>
      </Options>
      <UnlinkAccountModal
        samlId={samlId}
        show={show === "UNLINK_ACCOUNT"}
        onClose={close}
      />
    </>
  );
}
