import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export interface PaginatorProps {
  currentPage: number;
  numberOfPages: number;
  onChangePage: (page: number) => void;
}

export const Paginator = (props: PaginatorProps) => {
  const textStyle = "leading-tight text-gray-500 hover:text-gray-700";
  const buttonStyle =
    "flex w-8 h-8 ml-0 bg-white border border-gray-300 hover:bg-gray-100";

  const { currentPage, numberOfPages, onChangePage } = props;

  return (
    <div
      className={`${textStyle} flex justify-between w-full items-center px-4 pb-2 -space-x-px`}
    >
      <div>
        Page {currentPage + 1} of {numberOfPages}
      </div>
      <ul className="flex">
        <li>
          <button
            title="First Page"
            className={`${buttonStyle} rounded-l-lg`}
            onClick={() => onChangePage(0)}
          >
            <ChevronDoubleLeftIcon className="w-5 m-auto" />
          </button>
        </li>
        <li>
          <button
            title="Previous Page"
            className={`${buttonStyle}`}
            onClick={() => onChangePage(Math.max(0, currentPage - 1))}
          >
            <ChevronLeftIcon className="w-5 m-auto" />
          </button>
        </li>
        <li>
          <button
            title="Next Page"
            className={`${buttonStyle}`}
            onClick={() =>
              onChangePage(Math.min(numberOfPages - 1, currentPage + 1))
            }
          >
            <ChevronRightIcon className="w-5 m-auto" />
          </button>
        </li>
        <li>
          <button
            title="Last Page"
            className={`${buttonStyle} rounded-r-lg`}
            onClick={() => onChangePage(numberOfPages - 1)}
          >
            <ChevronDoubleRightIcon className="w-5 m-auto" />
          </button>
        </li>
      </ul>
    </div>
  );
};
