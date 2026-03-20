// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

import { Options, Option } from "@/components/options";
import { User } from "@/models/scim";
import { Client } from "@/models/client";
import RemoveOwnerModal from "./remove-owner-modal";

type OwnerOptions = {
  owner: User;
  client: Client;
};

export function OwnerOptions(props: Readonly<OwnerOptions>) {
  const { owner, client } = props;
  const [open, setOpen] = useState<"REMOVE">();
  const close = () => setOpen(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setOpen("REMOVE")} data-danger>
          <div className="flex items-center gap-2">
            <ArrowRightEndOnRectangleIcon className="size-4" />
            <span>Remove</span>
          </div>
        </Option>
      </Options>
      <RemoveOwnerModal
        owner={owner}
        client={client}
        show={open === "REMOVE"}
        onClose={close}
      />
    </>
  );
}
