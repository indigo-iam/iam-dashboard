// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Select, SelectOption } from "@/components/form";

type EntityType = "null" | "user" | "group";

type AccountGroupSelectorProps = {
  entityType: EntityType;
  onChange: (entityType: EntityType) => void;
};

const entityOptions = [
  { id: "null", name: "NULL" },
  { id: "user", name: "USER" },
  { id: "group", name: "GROUP" },
];

export function AccountGroupSelector(
  props: Readonly<AccountGroupSelectorProps>
) {
  const { entityType, onChange } = props;
  const selectedOption = { id: entityType, name: entityType.toUpperCase() };

  function handleChange(value: SelectOption) {
    const entityType = value.id;
    if (
      entityType !== "null" &&
      entityType !== "user" &&
      entityType !== "group"
    ) {
      throw new Error(`${entityType} not valid`);
    }
    onChange(entityType);
  }

  return (
    <Select
      name="entityType"
      defaultValue={selectedOption}
      onChange={handleChange}
    >
      {entityOptions.map(ep => (
        <SelectOption key={ep.id} value={ep}>
          {ep.name}
        </SelectOption>
      ))}
    </Select>
  );
}
