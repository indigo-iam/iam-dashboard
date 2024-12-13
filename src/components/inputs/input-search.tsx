"use client";
import { Input } from "@/components/inputs";
import { useRef } from "react";

type InputSearchProps = {
  onChange: (filter: string) => void;
  onClear: () => void;
};

export function InputSearch(props: Readonly<InputSearchProps>) {
  const { onChange, onClear } = props;
  const searchCallback = async (filter: string) => {
    if (filter.length > 2) {
      onChange(filter);
    }
  };

  const timeoutRef = useRef<number | null>(null);
  const delayedSearch = (filter: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      filter ? searchCallback(filter) : onClear();
    }, 150);
  };

  return (
    <Input
      onKeyUp={e => delayedSearch(e.currentTarget.value)}
      placeholder="Type to search..."
    />
  );
}
