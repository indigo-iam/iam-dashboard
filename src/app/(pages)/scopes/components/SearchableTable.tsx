"use client";
import { Paginator } from "@/components/Table";
import ScopesTable from "./Table";
import { Scope } from "@/models/client";
import { InputSearch } from "@/components/Inputs";
import { useState } from "react";

type SearchableTableProps = {
  count: number;
  page: number;
  scopes: Scope[];
};

export default function SearchableTable(props: Readonly<SearchableTableProps>) {
  const { count, page, scopes } = props;
  const [filteredScopes, setFilteredScopes] = useState(scopes);
  const numberOfPages = Math.ceil(filteredScopes.length / count);
  const startIndex = (page - 1) * count;
  const endIndex = startIndex + count;

  const handleFilterChange = (filter: string) => {
    setFilteredScopes(scopes.filter(s => s.value.includes(filter)));
  };

  const handleFilterClear = () => {
    setFilteredScopes(scopes);
  };

  return (
    <>
      <InputSearch onChange={handleFilterChange} onClear={handleFilterClear} />
      <ScopesTable scopes={filteredScopes.slice(startIndex, endIndex)} />
      <Paginator numberOfPages={numberOfPages} />
    </>
  );
}
