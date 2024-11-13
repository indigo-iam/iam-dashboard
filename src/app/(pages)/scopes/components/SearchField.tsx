"use client";
import { InputSearch } from "@/components/Inputs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchField() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filter);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("filter");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <InputSearch onChange={handleFilterChange} onClear={handleFilterClear} />
  );
}
