// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ScopeIcon from "@/app/components/scope-icon";
import { Scope } from "@/models/client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ScopeTypeSelect from "./scope-type-select";
import ScopeOptions from "./options";

type ScopesTableProps = {
  scopes: Scope[];
};

export default function ScopesTable(props: Readonly<ScopesTableProps>) {
  const { scopes } = props;
  if (scopes.length === 0) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <MagnifyingGlassIcon className="text-primary/60 size-16 dark:text-white/60" />
        <p>No scope found.</p>
      </div>
    );
  }
  return (
    <ul>
      {scopes.map(scope => (
        <li
          className="iam-list-item flex-row items-center gap-2"
          key={scope.id}
        >
          <div className="flex grow flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
            <div className="flex grow flex-col">
              <div className="flex-inline flex items-center gap-2">
                <ScopeIcon
                  scope={scope}
                  className="text-infn dark:text-secondary size-4"
                />
                <p>{scope.value}</p>
              </div>
              <p className="text-gray dark:text-secondary/70 text-sm">
                {scope.description}
              </p>
            </div>
            <ScopeTypeSelect key={scope.id} scope={scope} />
          </div>
          <ScopeOptions scope={scope} />
        </li>
      ))}
    </ul>
  );
}
