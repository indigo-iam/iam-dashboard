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
  { id: "null", name: "BOTH" },
  { id: "user", name: "USER" },
  { id: "group", name: "GROUP" },
];

export function AccountGroupSelector(
  props: Readonly<AccountGroupSelectorProps>
) {
  const { entityType, onChange } = props;
  const selectedOption = entityOptions.find(option => option.id === entityType) ?? entityOptions[0];

  function handleChange(value: SelectOption) {
    const newEntityType = value.id;
    if (
      newEntityType !== "null" &&
      newEntityType !== "user" &&
      newEntityType !== "group"
    ) {
      throw new Error(`${newEntityType} not valid`);
    }
    onChange(newEntityType);
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
