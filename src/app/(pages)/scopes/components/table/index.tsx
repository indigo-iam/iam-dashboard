// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Scope } from "@/models/client";
import ScopeTypeSelect from "./scope-type-select";
import InputDescription from "./input-description";
import ScopeOptions from "./options";

type ScopesTableProps = {
  scopes: Scope[];
};

export default function ScopesTable(props: Readonly<ScopesTableProps>) {
  const { scopes } = props;
  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="tbl-th text-left">Scope</th>
          <th className="tbl-th text-left">Type</th>
          <th className="tbl-th text-left">Description</th>
          <th className="tbl-th text-center" />
        </tr>
      </thead>
      <tbody>
        {scopes.map(scope => (
          <tr className="tbl-tr" key={scope.id}>
            <td className="tbl-td w-8 font-medium">{scope.value}</td>
            <td className="tbl-td w-36">
              <ScopeTypeSelect key={scope.id} scope={scope} />
            </td>
            <td className="tbl-td min-w-24 grow">
              <InputDescription key={scope.id} scope={scope} />
            </td>
            <td className="tbl-td w-1/12 text-center">
              <ScopeOptions scope={scope} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
