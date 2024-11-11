"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface PaginatorProps {
  numberOfPages: number;
}

export default function Paginator(props: Readonly<PaginatorProps>) {
  const textStyle = "leading-tight text-gray-500 hover:text-gray-700";
  const buttonStyle =
    "flex p-0.5 ml-0 bg-white text-primary/50 border border-primary/10 hover:bg-primary/10 dark:bg-secondary/50 dark:text-secondary dark:hover:text-primary/50";

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
    <div
      className={`${textStyle} flex w-full items-center justify-between -space-x-px px-4 pb-2`}
    >
      <div className="flex items-center space-x-2">
        <div>
          Page {currentPage} of {numberOfPages}
        </div>
        <div>Show</div>
        <select
          value={itemsPerPage}
          className="block rounded-lg border border-gray-300 bg-gray-50 p-1 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-primary dark:text-secondary/50"
          onChange={e => onChangeItemsPerPage(parseInt(e.currentTarget.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
      </div>
      <ul className="flex">
        <li>
          <Link
            title="First Page"
            className={`${buttonStyle} rounded-l-lg ${currentPage === 1 ? "pointer-events-none opacity-30" : ""}`}
            href={createPageURL(1)}
          >
            <ChevronDoubleLeftIcon className="m-auto w-5" />
          </Link>
        </li>
        <li>
          <Link
            title="Previous Page"
            className={`${buttonStyle} ${currentPage === 1 ? "pointer-events-none opacity-30" : ""}`}
            href={createPageURL(currentPage - 1)}
          >
            <ChevronLeftIcon className="m-auto w-5" />
          </Link>
        </li>
        <li>
          <Link
            title="Next Page"
            className={`${buttonStyle} ${currentPage === numberOfPages ? "pointer-events-none opacity-30" : ""}`}
            href={createPageURL(currentPage + 1)}
          >
            <ChevronRightIcon className="m-auto w-5" />
          </Link>
        </li>
        <li>
          <Link
            title="Last Page"
            className={`${buttonStyle} rounded-r-lg ${currentPage === numberOfPages ? "pointer-events-none opacity-30" : ""}`}
            href={createPageURL(numberOfPages)}
          >
            <ChevronDoubleRightIcon className="m-auto w-5" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
