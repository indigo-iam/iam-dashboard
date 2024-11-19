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
        className="combobox w-full"
        placeholder="Type to search..."
        displayValue={(user: User) => user?.displayName ?? ""}
        onChange={event => setQuery(event.target.value)}
      />
      <div className="relative">
        <ComboboxOptions className="combobox-options">
          {items.map(item => (
            <ComboboxOption
              className="combobox-option"
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
