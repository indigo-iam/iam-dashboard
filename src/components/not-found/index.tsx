// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";

export function NotFound() {
  return (
    <div className="flex flex-col items-center p-8">
      <MagnifyingGlassCircleIcon className="size-24 stroke-1 text-gray-300 dark:text-gray-400" />
      <p>No result found.</p>
    </div>
  );
}
