"use client";
import Input from "@/components/Input";
import { useRef } from "react";

type SearchUserProps = {
  onFilter: (filter: string) => void;
  onFilterClear: () => void;
};

export default function SearchUser(props: Readonly<SearchUserProps>) {
  const { onFilter, onFilterClear } = props;
  const searchCallback = async (filter: string) => {
    if (filter.length > 2) {
      onFilter(filter);
    }
  };

  const timeoutRef = useRef<number | null>();
  const delayedSearch = (filter: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      filter ? searchCallback(filter) : onFilterClear();
    }, 150);
  };

  return (
    <Input
      onKeyUp={e => delayedSearch(e.currentTarget.value)}
      placeholder="Type to search..."
    />
  );
}
