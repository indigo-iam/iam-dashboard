// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { InputSearch } from "./input-search";
import { InputProps } from "./input";

type InputQueryProps = InputProps & {
  "data-testid"?: string;
};

export function InputQuery(props: Readonly<InputQueryProps>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const defaultValue = searchParams.get("query") ?? undefined;

  const setQuery = (query: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("query", query);
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearQuery = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <InputSearch
      onQueryChange={setQuery}
      onClear={clearQuery}
      {...props}
      defaultValue={defaultValue}
    />
  );
}
