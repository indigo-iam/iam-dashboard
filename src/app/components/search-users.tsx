// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId, useRef, useState } from "react";

import { Field } from "@/components/field";
import { Input } from "@/components/inputs";
import { Label } from "@/components/label";
import { User } from "@/models/scim";
import { searchUser } from "@/services/users";
import { useDeferredCallback } from "@/utils/hooks";

type SearchUserProps = {
  onSelect: (user: User | null) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  defaultValue?: string;
};

export function SearchUsers(props: Readonly<SearchUserProps>) {
  const { onSelect, defaultValue } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<User | null>(null);

  const { deferredCallback } = useDeferredCallback();

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange?.(event);
    deferredCallback(async () => {
      const query = event.target.value;
      if (query) {
        const result = await searchUser(query);
        setSearchResult(result);
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
        setSelected(result);
        inputRef.current?.setCustomValidity("");
        setError("");
        return;
      }
    }
    inputRef.current?.setCustomValidity("User not found.");
    setError("Please enter a valid user.");
    if (selected) {
      onSelect(null);
      setSelected(null);
    }
  }

  return (
    <Field>
      <Label>Search user</Label>
      <Input
        list={listId}
        ref={inputRef}
        onChange={handleQueryChange}
        onInput={onInput}
        defaultValue={defaultValue}
        placeholder="Type to search for a user..."
      />
      <datalist id={listId}>
        {searchResult.map(user => (
          <option key={user.id} value={user.userName}>
            {user.emails?.[0].value}
          </option>
        ))}
      </datalist>
      {error && <p className="text-danger text-sm">{error}</p>}
    </Field>
  );
}
