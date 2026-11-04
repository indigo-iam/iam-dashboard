// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId, useState } from "react";

import { Input } from "@/components/inputs";
import { Group } from "@/models/groups";
import { searchGroup } from "@/services/groups";
import { useDeferredCallback } from "@/utils/hooks";

type SearchGroupProps = {
  onSelect: (group: Group) => void;
  defaultValue?: string;
};

export function SearchGroups(props: Readonly<SearchGroupProps>) {
  const { onSelect, defaultValue } = props;
  const [query, setQuery] = useState<string>();
  const [searchResult, setSearchResult] = useState<Group[]>([]);
  const { deferredCallback } = useDeferredCallback();
  const listId = useId();

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const group = event.target.value;
    deferredCallback(async () => {
      if (group) {
        const result = await searchGroup(group);
        setSearchResult(result);
        if (result.length === 1 && result[0].displayName === group) {
          onSelect(result[0]);
        }
      } else {
        setSearchResult([]);
      }
    });
    setQuery(group);
  }

  return (
    <div className="space-y-2">
      <Input
        name="search-group"
        list={listId}
        onChange={handleQueryChange}
        defaultValue={defaultValue}
        placeholder="Type to search for a group..."
        autoComplete="off"
      />
      <datalist id={listId}>
        {searchResult.map(group => (
          <option key={group.id} value={group.displayName}>
            {group["urn:indigo-dc:scim:schemas:IndigoGroup"].description}
          </option>
        ))}
      </datalist>
      {searchResult.length === 0 && query && <p>No group found.</p>}
    </div>
  );
}
