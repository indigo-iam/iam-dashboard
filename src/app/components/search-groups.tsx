// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Combobox, ComboboxOption } from "@/components/combobox";
import { Group } from "@/models/groups";
import { searchGroup } from "@/services/groups";
import { useState } from "react";

export function SearchGroups(
  props: Readonly<{ onSelect: (group: Group) => void }>
) {
  const { onSelect } = props;
  const [searchResult, setSearchResult] = useState<Group[]>([]);

  const handleQueryChange = async (query: string) => {
    const result = await searchGroup(query);
    setSearchResult(result);
  };

  if (searchResult.length === 0) {
    return (
      <Combobox<Group> onSelect={onSelect} onQueryChange={handleQueryChange}>
        <ComboboxOption value={undefined}>No user found.</ComboboxOption>
      </Combobox>
    );
  }

  return (
    <Combobox<Group> onSelect={onSelect} onQueryChange={handleQueryChange}>
      {searchResult.map(group => (
        <ComboboxOption key={group.id} value={group}>
          <span className="font-bold">{group.displayName}</span> ({group.id})
        </ComboboxOption>
      ))}
    </Combobox>
  );
}
