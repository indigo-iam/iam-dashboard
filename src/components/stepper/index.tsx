// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { arrayRange } from "@/utils/numbers";

function PreviousPage(props: Readonly<{ page: number }>) {
  const { page } = props;
  return (
    <div>
      <div className="text-secondary bg-primary flex aspect-square size-8 items-center justify-center rounded-full">
        {page + 1}
      </div>
      <div className="border-primary m-auto h-12 w-0 border-l-3" />
    </div>
  );
}

function CurrentPage(props: Readonly<{ page: number; totalPages: number }>) {
  const { page, totalPages } = props;
  const isLast = page === totalPages - 1;
  return (
    <div>
      <div className="text-primary border-primary flex aspect-square size-8 items-center justify-center rounded-full border-3 bg-white">
        {page + 1}
      </div>
      <div
        className="m-auto h-12 w-0 border-l-3 border-gray-400 data-[last=true]:hidden"
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
      <div className="text-secondary flex size-8 items-center justify-center rounded-full bg-gray-400">
        {page + 1}
      </div>
      <div
        className="m-auto h-12 w-0 border-l-3 border-gray-400 data-[last=true]:hidden"
        data-last={isLast}
      />
    </div>
  );
}

type StepperProps = {
  currentPage: number;
  totalPages: number;
};

export function Stepper(props: Readonly<StepperProps>) {
  const { currentPage, totalPages } = props;
  const lastPage = totalPages - 1;

  // if currentPage == 0, previousPage is an empty array
  const previousPages = arrayRange(0, currentPage - 1);
  const nextPages = arrayRange(currentPage + 1, lastPage);

  function PreviousPages() {
    return previousPages.map(i => <PreviousPage key={`step-${i}`} page={i} />);
  }

  function NextPages() {
    return nextPages.map(i => (
      <NextPage key={`step-${i}`} page={i} totalPages={totalPages} />
    ));
  }

  return (
    <div className="p-8">
      <PreviousPages />
      <CurrentPage page={currentPage} totalPages={totalPages} />
      <NextPages />
    </div>
  );
}
