// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId, useRef, useState } from "react";

import { Input } from "@/components/inputs";
import { Group } from "@/models/groups";
import { searchGroup } from "@/services/groups";
import { useDeferredCallback } from "@/utils/hooks";
import { Field } from "@/components/field";
import { Label } from "@/components/label";

type SearchGroupProps = {
  onSelect: (group: Group | null) => void;
  defaultValue?: string;
  disabled?: boolean;
};

export function SearchGroups(props: Readonly<SearchGroupProps>) {
  const { onSelect, defaultValue, disabled } = props;
  const [query, setQuery] = useState<string>();
  const [searchResult, setSearchResult] = useState<Group[]>([]);
  const [selected, setSelected] = useState<Group | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
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
          setSelected(result[0]);
          if (error) {
            setError("");
            inputRef.current?.setCustomValidity("");
          }
        }
      } else {
        setSearchResult([]);
        if (selected) {
          setSelected(null);
        }
        inputRef.current?.setCustomValidity("Group not found.");
        setError("Please enter a valid group.");
      }
    });
    setQuery(group);
  }

  function onInput(event: React.InputEvent<HTMLInputElement>) {
    const input = event.target as HTMLInputElement;
    for (const result of searchResult) {
      if (result.displayName === input.value) {
        onSelect(result);
        setSelected(result);
        inputRef.current?.setCustomValidity("");
        setError("");
        return;
      }
    }
    inputRef.current?.setCustomValidity("Group not found.");
    setError("Please enter a valid group.");
    if (selected) {
      onSelect(null);
      setSelected(null);
    }
  }

  return (
    <Field>
      <Label>Search group</Label>
      <Input
        name="search-group"
        list={listId}
        onInput={onInput}
        onChange={handleQueryChange}
        defaultValue={defaultValue}
        placeholder="Type to search for a group..."
        autoComplete="off"
        ref={inputRef}
        disabled={disabled}
      />
      <datalist id={listId}>
        {searchResult.map(group => (
          <option key={group.id} value={group.displayName}>
            {group["urn:indigo-dc:scim:schemas:IndigoGroup"].description}
          </option>
        ))}
      </datalist>
      {error && <p className="text-danger text-sm">{error}</p>}
      {searchResult.length === 0 && query && <p>No group found.</p>}
    </Field>
  );
}
