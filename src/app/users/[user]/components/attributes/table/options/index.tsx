// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Option, Options } from "@/components/options";
import { Attribute } from "@/models/attributes";
import { User } from "@/models/scim";
import DeleteUserModal from "./delete-button";
import { useState } from "react";

type OptionsProps = {
  user: User;
  attr: Attribute;
};

export default function AttributeOptions(props: Readonly<OptionsProps>) {
  const { user, attr } = props;
  const [show, setShow] = useState<"DELETE_USER">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("DELETE_USER")} data-danger>
          Delete
        </Option>
      </Options>
      <DeleteUserModal
        user={user}
        attr={attr}
        show={show === "DELETE_USER"}
        onClose={close}
      />
    </>
  );
}
