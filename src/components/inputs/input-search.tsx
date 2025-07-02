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
    <div className="iam-input flex items-center gap-2 outline-blue-600 focus-within:outline">
      <MagnifyingGlassIcon className="size-6 text-gray-400" />
      <Input
        onKeyUp={() => delayedSearch()}
        placeholder="Type to search..."
        value={value}
        className="w-full outline-hidden"
        onChange={e => setValue(e.currentTarget.value)}
        {...others}
      />
      <button
        className="text-extralight hover:text-primary"
        onClick={clearSearch}
      >
        <XCircleIcon className="size-4" />
      </button>
    </div>
  );
}
