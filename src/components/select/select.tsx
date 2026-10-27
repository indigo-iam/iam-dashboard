// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select(props: Readonly<SelectProps>) {
  return (
    <select
      className="appearance-none rounded-md border border-gray-200 bg-gray-100 bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iIzZlNzY4MSIgY2xhc3M9InNpemUtNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNC4yMiA2LjIyYS43NS43NSAwIDAgMSAxLjA2IDBMOCA4Ljk0bDIuNzItMi43MmEuNzUuNzUgMCAxIDEgMS4wNiAxLjA2bC0zLjI1IDMuMjVhLjc1Ljc1IDAgMCAxLTEuMDYgMEw0LjIyIDcuMjhhLjc1Ljc1IDAgMCAxIDAtMS4wNloiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz48L3N2Zz4=)] bg-size-[16px] bg-right bg-no-repeat px-2 py-1 pr-4 text-sm font-normal text-nowrap text-gray-950 transition ease-out hover:bg-gray-50 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:active:bg-sky-700 dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
      {...props}
    />
  );
}
