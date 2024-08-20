"use client";
import { ScimUser } from "@/models/scim";
import { searchUser } from "@/services/users";
import { useState } from "react";
import InputSearch from "../SearchFilter";

type ResultsDropDownProps = {
  results: ScimUser[];
  onClick?: (user: ScimUser) => void;
};

function ResultsDropDown(props: Readonly<ResultsDropDownProps>) {
  const { results, onClick } = props;

  if (results.length === 0) {
    return null;
  }

  return (
    <ul className="absolute z-50 mx-auto w-full rounded-xl border bg-secondary">
      {results.map(el => {
        return (
          <li
            key={el.id}
            className="p-2 text-sm first:rounded-t-xl last:rounded-b-xl hover:cursor-pointer hover:bg-primary-700 hover:text-secondary"
          >
            <button
              className="h-full w-full text-left"
              onClick={() => onClick?.(el)}
            >
              <b>{el.name?.formatted}</b> ({el.displayName})
            </button>
          </li>
        );
      })}
    </ul>
  );
}

type SearchUserProps = {
  hidden?: boolean;
  onSelected?: (user: ScimUser) => void;
};

export default function SearchUser(props: Readonly<SearchUserProps>) {
  const { hidden, onSelected } = props;
  const [results, setResults] = useState<ScimUser[]>([]);

  const handleFilterChange = async (filter: string) => {
    if (filter.length > 2) {
      const found = await searchUser(filter);
      setResults(found);
    } else {
      clearResults();
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  const select = (user: ScimUser) => {
    clearResults();
    onSelected?.(user);
  };

  return (
    <div className="relative" hidden={hidden}>
      <InputSearch onChange={handleFilterChange} onClear={clearResults} />
      <ResultsDropDown onClick={select} results={results} />
    </div>
  );
}
