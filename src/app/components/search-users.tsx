// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Field, Label } from "@/components/form";
import { User } from "@/models/scim";
import { searchUser } from "@/services/users";
import { useDeferredCallback } from "@/utils/hooks";
import { useState } from "react";

type SearchUserProps = {
  listId: string;
  onSelect: (user: User) => void;
};

export function SearchUsers(props: Readonly<SearchUserProps>) {
  const { listId, onSelect } = props;
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const { deferredCallback } = useDeferredCallback();

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    deferredCallback(async () => {
      const query = event.target.value;
      if (query) {
        const result = await searchUser(query);
        setSearchResult(result);
        if (result.length === 1 && result[0].name?.formatted === query) {
          onSelect(result[0]);
        }
      } else {
        setSearchResult([]);
      }
    });
  }

  return (
    <Field>
      <Label>Search user</Label>
      <input
        className="iam-input"
        list={listId}
        onChange={handleQueryChange}
        placeholder="Type to search for a user..."
      />
      <datalist id={listId}>
        {searchResult.map(user => (
          <option key={user.id} value={user.name?.formatted}>
            {user.emails?.[0].value}
          </option>
        ))}
      </datalist>
    </Field>
  );
}
