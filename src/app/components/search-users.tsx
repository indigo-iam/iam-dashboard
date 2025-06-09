// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Combobox, ComboboxOption } from "@/components/combobox";
import { User } from "@/models/scim";
import { searchUser } from "@/services/users";
import { useState } from "react";

export function SearchUsers(props: Readonly<{ onSelect: (user: User) => void }>) {
  const { onSelect } = props;
  const [searchResult, setSearchResult] = useState<User[]>([]);

  const handleQueryChange = async (query: string) => {
    const result = await searchUser(query);
    setSearchResult(result);
  };

  if (searchResult.length === 0) {
    return (
      <Combobox<User> onSelect={onSelect} onQueryChange={handleQueryChange}>
        <ComboboxOption value={undefined}>No user found.</ComboboxOption>
      </Combobox>
    );
  }

  return (
    <Combobox<User> onSelect={onSelect} onQueryChange={handleQueryChange}>
      {searchResult.map(user => (
        <ComboboxOption key={user.id} value={user}>
          <span className="font-bold">{user.name?.formatted}</span> (
          {user.emails?.[0].value})
        </ComboboxOption>
      ))}
    </Combobox>
  );
}
