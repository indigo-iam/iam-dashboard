// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { arrayRange } from "@/utils/numbers";

function PreviousPage(props: Readonly<{ page: number }>) {
  const { page } = props;
  return (
    <div>
      <div className="bg-infn flex aspect-square size-8 items-center justify-center rounded-full bg-gray-700 text-white dark:border-3 dark:border-gray-200 dark:bg-gray-200 dark:font-bold dark:text-gray-700">
        {page + 1}
      </div>
      <div className="border-infn dark:border-secondary m-auto h-12 w-0 border-l-3 border-gray-700 dark:border-gray-200" />
    </div>
  );
}

function CurrentPage(props: Readonly<{ page: number; totalPages: number }>) {
  const { page, totalPages } = props;
  const isLast = page === totalPages - 1;
  return (
    <div>
      <span className="transparent flex aspect-square size-8 items-center justify-center rounded-full border-3 border-gray-700 text-gray-700 dark:border-white dark:text-gray-200">
        {page + 1}
      </span>
      <div
        className="m-auto h-12 w-0 border-l-3 border-gray-300 data-[last=true]:hidden dark:border-gray-500"
        data-last={isLast}
      />
    </div>
  );
}

function NextPage(props: Readonly<{ page: number; totalPages: number }>) {
  const { page, totalPages } = props;
  const isLast = page === totalPages - 1;
  return (
    <div>
      <div className="dark:gray-400 flex size-8 items-center justify-center rounded-full border-gray-500 bg-gray-200 text-gray-700 dark:border-3 dark:bg-transparent dark:text-gray-500">
        {page + 1}
      </div>
      <div
        className="dark:border-secondary/30 m-auto h-12 w-0 border-l-3 border-gray-300 data-[last=true]:hidden dark:border-gray-500"
        data-last={isLast}
      />
    </div>
  );
}

type PreviousPagesProps = {
  previousPages: number[];
};

function PreviousPages(props: Readonly<PreviousPagesProps>) {
  const { previousPages } = props;
  return (
    <>
      {previousPages.map(i => (
        <PreviousPage key={`step-${i}`} page={i} />
      ))}
    </>
  );
}

type NextPagesProps = {
  nextPages: number[];
  totalPages: number;
};

function NextPages(props: Readonly<NextPagesProps>) {
  const { nextPages, totalPages } = props;
  return (
    <>
      {nextPages.map(i => (
        <NextPage key={`step-${i}`} page={i} totalPages={totalPages} />
      ))}
    </>
  );
}

type StepperProps = {
  currentPage: number;
  totalPages: number;
};

export function Stepper(props: Readonly<StepperProps>) {
  const { currentPage, totalPages } = props;
  const lastPage = totalPages - 1;
  const previousPages = arrayRange(0, currentPage - 1);
  const nextPages = arrayRange(currentPage + 1, lastPage);
  return (
    <>
      <PreviousPages previousPages={previousPages} />
      <CurrentPage page={currentPage} totalPages={totalPages} />
      <NextPages nextPages={nextPages} totalPages={totalPages} />
    </>
  );
}
