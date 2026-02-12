// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { arrayRange } from "@/utils/numbers";

function PreviousPage(props: Readonly<{ page: number }>) {
  const { page } = props;
  return (
    <div>
      <div className="text-secondary bg-infn dark:text-primary dark:border-light-gray dark:bg-light-gray flex aspect-square size-8 items-center justify-center rounded-full dark:border-3">
        {page + 1}
      </div>
      <div className="border-infn dark:border-secondary m-auto h-12 w-0 border-l-3" />
    </div>
  );
}

function CurrentPage(props: Readonly<{ page: number; totalPages: number }>) {
  const { page, totalPages } = props;
  const isLast = page === totalPages - 1;
  return (
    <div>
      <div className="text-primary border-infn dark:border-light-gray dark:text-light-gray flex aspect-square size-8 items-center justify-center rounded-full border-3 bg-transparent">
        {page + 1}
      </div>
      <div
        className="dark:border-secondary/30 m-auto h-12 w-0 border-l-3 border-gray-400 data-[last=true]:hidden"
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
      <div className="text-secondary dark:bg-secondary/30 flex size-8 items-center justify-center rounded-full bg-gray-400">
        {page + 1}
      </div>
      <div
        className="dark:border-secondary/30 m-auto h-12 w-0 border-l-3 border-gray-400 data-[last=true]:hidden"
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
