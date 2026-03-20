// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { arrayRange } from "@/utils/numbers";

type PageViewProps = {
  page: number;
};

function PreviousPage(props: Readonly<PageViewProps>) {
  const { page } = props;
  return (
    <div className="flex grow items-center md:flex-col">
      <div className="bg-infn flex aspect-square min-h-3 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-700 text-white dark:border-gray-200 dark:bg-gray-200 dark:font-bold dark:text-gray-700">
        <span className="hidden p-1.5 md:inline-block">{page + 1}</span>
      </div>
      <div className="border-infn dark:border-secondary grow border-t-2 border-gray-700 md:h-12 md:w-0 md:border-l-3 dark:border-gray-200" />
    </div>
  );
}

function CurrentPage(props: Readonly<PageViewProps>) {
  const { page } = props;
  return (
    <div className="group flex grow items-center last:flex-none md:flex-col">
      <div className="transparent flex aspect-square min-h-3 items-center justify-center rounded-full border-2 border-gray-700 text-gray-700 dark:border-white dark:bg-gray-400 dark:text-gray-200">
        <span className="hidden p-1.5 text-sm md:inline-block">{page + 1}</span>
      </div>
      <div className="grow border-t-2 border-gray-300 group-last:hidden md:h-12 md:w-0 md:border-l-3 dark:border-gray-500" />
    </div>
  );
}

function NextPage(props: Readonly<PageViewProps>) {
  const { page } = props;
  return (
    <div className="group flex grow items-center last:flex-none md:flex-col">
      <div className="dark:gray-400 flex aspect-square min-h-3 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-200 text-gray-700 dark:bg-gray-500 dark:text-gray-500 dark:md:bg-transparent">
        <span className="hidden p-1.5 text-sm md:inline-block">{page + 1}</span>
      </div>
      <div className="grow border-t-2 border-gray-300 group-last:hidden md:h-12 md:w-0 md:border-l-3 dark:border-gray-500" />
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
};

function NextPages(props: Readonly<NextPagesProps>) {
  const { nextPages } = props;
  return (
    <>
      {nextPages.map(i => (
        <NextPage key={`step-${i}`} page={i} />
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
    <div className="flex w-full items-center md:w-auto md:flex-col">
      <PreviousPages previousPages={previousPages} />
      <CurrentPage page={currentPage} />
      <NextPages nextPages={nextPages} />
    </div>
  );
}
