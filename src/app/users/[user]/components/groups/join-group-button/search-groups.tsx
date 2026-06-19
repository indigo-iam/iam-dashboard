// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Group } from "@/models/groups";
import { searchGroup } from "@/services/groups";
import { useDeferredCallback } from "@/utils/hooks";
import { useState } from "react";

type SearchGroupProps = {
  listId: string;
  onSelect: (group: Group) => void;
};

export function SearchGroups(props: Readonly<SearchGroupProps>) {
  const { listId, onSelect } = props;
  const [query, setQuery] = useState<string>();
  const [searchResult, setSearchResult] = useState<Group[]>([]);
  const { deferredCallback } = useDeferredCallback();

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
      <input
        className="iam-input"
        list={listId}
        onChange={handleQueryChange}
        placeholder="Type to search for a group..."
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
