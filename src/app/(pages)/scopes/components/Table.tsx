import { Scope } from "@/models/client";
import ScopeTypeSelect from "./ScopeTypeSelect";
import InputDescription from "./InputDescription";
import ScopeOptions from "./Options";

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
          <tr key={scope.id}>
            <td className="tbl-td w-8 font-medium">{scope.value}</td>
            <td className="tbl-td w-24">
              <ScopeTypeSelect key={scope.id} scope={scope} />
            </td>
            <td className="tbl-td min-w-24 grow">
              <InputDescription key={scope.id} scope={scope} />
            </td>
            <td className="tbl-td w-4 text-center">
              <ScopeOptions scope={scope} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
