// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId, useState } from "react";

import { Field } from "@/components/field";
import { Input } from "@/components/inputs";
import { Label } from "@/components/label";
import { User } from "@/models/scim";
import { searchUser } from "@/services/users";
import { useDeferredCallback } from "@/utils/hooks";

type SearchUserProps = {
  onSelect: (user: User) => void;
};

export function SearchUsers(props: Readonly<SearchUserProps>) {
  const { onSelect } = props;
  const listId = useId();
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

  function onInput(event: React.InputEvent<HTMLInputElement>) {
    const input = event.target as HTMLInputElement;
    for (const result of searchResult) {
      if (result.userName === input.value) {
        onSelect(result);
      }
    }
  }

  return (
    <Field>
      <Label>Search user</Label>
      <Input
        list={listId}
        onChange={handleQueryChange}
        onInput={onInput}
        placeholder="Type to search for a user..."
      />
      <datalist id={listId}>
        {searchResult.map(user => (
          <option key={user.id} value={user.userName}>
            {user.emails?.[0].value}
          </option>
        ))}
      </datalist>
    </Field>
  );
}
