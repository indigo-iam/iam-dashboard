// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Option, Options } from "@/components/options";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DeleteLabelModal } from "./delete-label";

type LabelOptionsProps = {
  userId: string;
  userFormattedName: string;
  name: string;
  prefix: string;
  value: string | null;
};

export function LabelOptions(props: Readonly<LabelOptionsProps>) {
  const { userId, userFormattedName, name, prefix, value } = props;
  const [show, setShow] = useState<"DELETE">();
  const showDelete = () => setShow("DELETE");
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option data-danger onClick={showDelete}>
          <TrashIcon className="size-4" />
          Delete
        </Option>
      </Options>
      <DeleteLabelModal
        show={show === "DELETE"}
        onClose={close}
        userId={userId}
        userFormattedName={userFormattedName}
        name={name}
        prefix={prefix}
        value={value}
      />
    </>
  );
}
