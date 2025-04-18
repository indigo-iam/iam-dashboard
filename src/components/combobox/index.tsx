// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { User } from "@/models/scim";
import { useState } from "react";
import {
  Combobox as HeadlessCombobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Group } from "@/models/groups";

type Searchable = User | Group;

type ComboboxProps<T extends Searchable> = {
  searchCallback: (query: string) => Promise<T[]>;
  onSelected: (item: T) => void;
};

export default function Combobox<T extends Searchable>(
  props: Readonly<ComboboxProps<T>>
) {
  const { onSelected, searchCallback } = props;
  const [items, setItems] = useState<T[]>([]);
  const itemNotFound = {
    id: "-1",
    displayName: "No results found",
  };

  const setQuery = async (query: string) => {
    if (query) {
      const results = await searchCallback(query);
      setItems(results.length > 0 ? results : [itemNotFound as T]);
    }
  };

  return (
    <HeadlessCombobox onChange={onSelected}>
      <ComboboxInput
        className="dark:text-secondary w-full rounded-lg border bg-transparent px-2 py-1"
        placeholder="Type to search..."
        displayValue={(user: User) => user?.displayName ?? ""}
        onChange={event => setQuery(event.target.value)}
      />
      <div className="relative">
        <ComboboxOptions className="z-50 rounded-lg border">
          {items.map(item => (
            <ComboboxOption
              className="px-4 py-1 hover:rounded-lg hover:bg-gray-200 data-[disabled]:bg-transparent dark:hover:bg-white/20 dark:data-[disabled]:bg-transparent"
              key={item.id}
              value={item}
              disabled={item.id === "-1"}
            >
              {item?.displayName}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </HeadlessCombobox>
  );
}
