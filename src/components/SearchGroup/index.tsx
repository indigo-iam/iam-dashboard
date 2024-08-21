"use client";
import { InputSearch } from "@/components/Inputs";
import { Group } from "@/models/groups";
import { searchGroup } from "@/services/groups";
import { useState } from "react";

type ResultsDropDownProps = {
  results: Group[];
  onClick?: (user: Group) => void;
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
              <b>{el.displayName}</b>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

type SearchGroupProps = {
  hidden?: boolean;
  onClick?: (group: Group) => void;
  className?: string;
};

export default function SearchGroup(props: Readonly<SearchGroupProps>) {
  const { hidden, onClick, className } = props;
  const [results, setResults] = useState<Group[]>([]);

  const handleFilterChange = async (filter: string) => {
    if (filter.length > 2) {
      const found = await searchGroup(filter);
      setResults(found);
    } else {
      clearResults();
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  const select = (group: Group) => {
    clearResults();
    onClick?.(group);
  };

  return (
    <div className={className}>
      <div className="relative" hidden={hidden}>
        <InputSearch onChange={handleFilterChange} onClear={clearResults} />
        <ResultsDropDown onClick={select} results={results} />
      </div>
    </div>
  );
}
