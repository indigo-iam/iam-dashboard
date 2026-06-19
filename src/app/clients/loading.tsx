// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Paginator from "@/components/paginator";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

function PlaceholderRow() {
  return (
    <li className="iam-list-item px-2 py-6" data-disabled={true}>
      <div className="w-full animate-pulse space-y-4">
        <div className="h-2.5 w-4/5 rounded bg-gray-200 dark:bg-gray-500" />
        <div className="h-2.5 w-1/3 rounded bg-gray-200 dark:bg-gray-500" />
      </div>
    </li>
  );
}

export default function Loading() {
  return (
    <section>
      <header className="section-header flex flex-wrap gap-2">
        <div className="flex grow items-center gap-2">
          <RocketLaunchIcon className="size-5" />
          <h2 className="text-base font-normal">Clients</h2>
        </div>
      </header>
      <div className="container space-y-4">
        <div className="panel">
          <ul>
            <PlaceholderRow />
            <PlaceholderRow />
            <PlaceholderRow />
            <PlaceholderRow />
          </ul>
        </div>
        <Paginator numberOfPages={0} />
      </div>
    </section>
  );
}
