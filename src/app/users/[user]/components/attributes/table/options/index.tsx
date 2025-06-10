// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import Options from "@/components/options";
import { Attribute } from "@/models/attributes";
import { User } from "@/models/scim";
import DeleteButton from "./delete-button";

type OptionsProps = {
  user: User;
  attr: Attribute;
};

export default function AttributeOptions(props: Readonly<OptionsProps>) {
  const { user, attr } = props;
  return (
    <Options>
      <DeleteButton user={user} attr={attr} />
    </Options>
  );
}
