// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Scope } from "@/models/client";
import ScopeTypeSelect from "./scope-type-select";
import ScopeOptions from "./options";

type ScopesTableProps = {
  scopes: Scope[];
};

export default function ScopesTable(props: Readonly<ScopesTableProps>) {
  const { scopes } = props;
  return (
    <ul>
      {scopes.map(scope => (
        <li className="iam-list-item flex-row items-center" key={scope.id}>
          <div className="flex grow flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex grow flex-col">
              <span className="font-medium">{scope.value}</span>
              <span className="text-light text-sm font-light">
                {scope.description}
              </span>
            </div>
            <div className="min-w-36 px-2">
              <ScopeTypeSelect key={scope.id} scope={scope} />
            </div>
          </div>
          <div>
            <ScopeOptions scope={scope} />
          </div>
        </li>
      ))}
    </ul>
  );
}
