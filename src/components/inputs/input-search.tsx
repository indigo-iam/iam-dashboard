// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Input, InputProps } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

interface InputSearchProps extends InputProps {
  onQueryChange: (filter: string) => void;
  onClear: () => void;
  "data-testid"?: string;
}

export function InputSearch(props: Readonly<InputSearchProps>) {
  const { onQueryChange, onClear, ...others } = props;
  const [value, setValue] = useState("");
  const timeoutRef = useRef<number | null>(null);

  const searchCallback = async (filter: string) => {
    if (filter.length > 2) {
      onQueryChange(filter);
    }
  };

  const clearSearch = () => {
    setValue("");
    onClear();
  };

  const delayedSearch = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      value ? searchCallback(value) : onClear();
    }, 150);
  };

  return (
    <div className="panel flex items-center gap-2 px-2 py-1 outline-blue-600 focus-within:outline">
      <MagnifyingGlassIcon className="size-6 text-gray-400 dark:text-gray-500" />
      <Input
        onKeyUp={() => delayedSearch()}
        placeholder="Type to search..."
        value={value}
        className="w-full outline-hidden dark:text-white"
        onChange={e => setValue(e.currentTarget.value)}
        {...others}
      />
      <button
        className="text-gray-300 hover:cursor-pointer hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-500"
        onClick={clearSearch}
        title="Clear search"
      >
        <XCircleIcon className="size-4" />
      </button>
    </div>
  );
}
