// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Group } from "@/models/groups";
import { searchGroup } from "@/services/groups";
import { useDeferredCallback } from "@/utils/hooks";
import { useState } from "react";

export function SearchGroups(
  props: Readonly<{ onSelect: (group: Group) => void }>
) {
  const { onSelect } = props;
  const [searchResult, setSearchResult] = useState<Group[]>([]);
  const { deferredCallback } = useDeferredCallback();

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    deferredCallback(async () => {
      const query = event.target.value;
      if (query) {
        const result = await searchGroup(query);
        setSearchResult(result);
        if (result.length === 1 && result[0].displayName === query) {
          onSelect(result[0]);
        }
      } else {
        setSearchResult([]);
      }
    });
  }

  return (
    <>
      <input
        className="iam-input"
        list="search-group-list"
        onChange={handleQueryChange}
        placeholder="Type to search for a group..."
      />
      <datalist id="search-group-list">
        {searchResult.map(group => (
          <option key={group.id} value={group.displayName}>
            {group["urn:indigo-dc:scim:schemas:IndigoGroup"].description}
          </option>
        ))}
      </datalist>
    </>
  );
}
