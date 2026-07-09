// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProgressBar } from "../progress-bar";
import { Button } from "../buttons";

const className =
  "flex p-0.5 ml-0 bg-white text-gray-500 border  hover:bg-gray-200 dark:bg-secondary/50 first:rounded-l-lg last:rounded-r-lg hover:cursor-pointer  hover:text-gray-500 dark:bg-gray-700  dark:text-gray-500 dark:hover:bg-gray-600 dark:hover:text-gray-400 disabled:opacity-30 disabled:pointer-events-none";

export interface PaginatorProps {
  numberOfPages: number;
  overrides?: {
    onFirst?: () => void;
    onPrevious?: () => void;
    onNext?: () => void;
    onLast?: () => void;
    onCountChange?: (count: number) => void;
    currentPage?: number;
    count?: number;
  };
}

export default function Paginator(props: Readonly<PaginatorProps>) {
  const { numberOfPages, overrides } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { startProgressBar } = useProgressBar();
  const currentPage =
    (overrides?.currentPage ?? Number(searchParams.get("page"))) || 1;
  const itemsPerPage =
    (overrides?.count ?? Number(searchParams.get("count"))) || 10;

  const createPageURL = (
    pageNumber: number | string,
    count: number = itemsPerPage
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    params.set("count", count.toString());
    return `${pathname}?${params.toString()}`;
  };

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const count = Number.parseInt(event.currentTarget.value);
    if (overrides?.onCountChange) {
      overrides.onCountChange(count);
      return;
    }
    router.push(createPageURL(1, count));
    startProgressBar();
  }

  function goFirst() {
    if (overrides?.onFirst) {
      overrides?.onFirst();
      return;
    }
    startProgressBar();
    router.push(createPageURL(1));
  }

  function goPrevious() {
    if (overrides?.onPrevious) {
      overrides.onPrevious();
      return;
    }
    startProgressBar();
    router.push(createPageURL(currentPage - 1));
  }

  function goNext() {
    if (overrides?.onNext) {
      overrides.onNext();
      return;
    }
    startProgressBar();
    router.push(createPageURL(currentPage + 1));
  }

  function goLast() {
    if (overrides?.onLast) {
      overrides.onLast();
      return;
    }
    startProgressBar();
    router.push(createPageURL(numberOfPages));
  }

  return (
    <div className="flex items-center justify-between px-4 pb-2 text-sm">
      <div className="flex items-center space-x-2">
        <span>
          Page {currentPage} of {numberOfPages}
        </span>
        <label htmlFor="items-per-page">Show</label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          className="block rounded-lg border bg-gray-50 p-1 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white/50"
          onChange={handleChange}
          aria-label="Items per page"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
      </div>
      <div className="flex">
        <Button
          title="First Page"
          className={className}
          disabled={currentPage <= 1}
          onClick={goFirst}
        >
          <ChevronDoubleLeftIcon className="m-auto w-5" />
        </Button>
        <Button
          title="Previous Page"
          className={className}
          disabled={currentPage <= 1}
          onClick={goPrevious}
        >
          <ChevronLeftIcon className="m-auto w-5" />
        </Button>
        <Button
          title="Next Page"
          className={className}
          disabled={currentPage >= numberOfPages}
          onClick={goNext}
        >
          <ChevronRightIcon className="m-auto w-5" />
        </Button>
        <Button
          title="Last Page"
          className={className}
          disabled={currentPage >= numberOfPages}
          onClick={goLast}
        >
          <ChevronDoubleRightIcon className="m-auto w-5" />
        </Button>
      </div>
    </div>
  );
}
