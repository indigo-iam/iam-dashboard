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
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const className =
  "flex p-0.5 ml-0 bg-white text-primary/50 border border-primary/10 hover:bg-infn/10 dark:bg-secondary/50 dark:text-secondary dark:hover:text-primary dark:hover:bg-white/70 first:rounded-l-lg last:rounded-r-lg data-[disabled=true]:opacity-30 data-[disabled=true]:pointer-events-none";

export interface PaginatorProps {
  numberOfPages: number;
}

export default function Paginator(props: Readonly<PaginatorProps>) {
  const { numberOfPages } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = Number(searchParams.get("count")) || 10;

  const createPageURL = (
    pageNumber: number | string,
    count: number = itemsPerPage
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    params.set("count", count.toString());
    return `${pathname}?${params.toString()}`;
  };

  const onChangeItemsPerPage = (count: number) => {
    router.push(createPageURL(1, count));
  };

  return (
    <div className="flex items-center justify-between px-4 pb-2">
      <div className="flex items-center space-x-2">
        <span>
          Page {currentPage} of {numberOfPages}
        </span>
        <label htmlFor="items-per-page">Show</label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          className="dark:text-secondary/50 block rounded-lg border border-gray-300 bg-gray-50 p-1 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-white/10"
          onChange={e => onChangeItemsPerPage(parseInt(e.currentTarget.value))}
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
        <Link
          title="First Page"
          className={className}
          data-disabled={currentPage === 1}
          href={createPageURL(1)}
        >
          <ChevronDoubleLeftIcon className="m-auto w-5" />
        </Link>
        <Link
          title="Previous Page"
          className={className}
          data-disabled={currentPage === 1}
          href={createPageURL(currentPage - 1)}
        >
          <ChevronLeftIcon className="m-auto w-5" />
        </Link>
        <Link
          title="Next Page"
          className={className}
          data-disabled={currentPage === numberOfPages}
          href={createPageURL(currentPage + 1)}
        >
          <ChevronRightIcon className="m-auto w-5" />
        </Link>
        <Link
          title="Last Page"
          className={className}
          data-disabled={currentPage === numberOfPages}
          href={createPageURL(numberOfPages)}
        >
          <ChevronDoubleRightIcon className="m-auto w-5" />
        </Link>
      </div>
    </div>
  );
}
