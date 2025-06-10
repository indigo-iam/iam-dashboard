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
        <li
          className="iam-list-item flex-row items-center gap-2"
          key={scope.id}
        >
          <div className="flex grow flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
            <div className="flex grow flex-col">
              <span className="font-medium">{scope.value}</span>
              <small className="dark:text-extralight font-light">
                {scope.description}
              </small>
            </div>
            <ScopeTypeSelect key={scope.id} scope={scope} />
          </div>
          <ScopeOptions scope={scope} />
        </li>
      ))}
    </ul>
  );
}
