import Link from "@/components/link";
import { ScopePolicy } from "@/models/scope-policies";
import PolicyOptions from "./options";

type PoliciesTableProps = {
  policies: ScopePolicy[];
};

function Row(props: Readonly<{ policy: ScopePolicy }>) {
  const { policy } = props;
  return (
    <tr className="tbl-tr tbl-hover">
      <td className="tbl-td text-wrap">
        <Link href={`/policies/${policy.id}`}>{policy.description}</Link>
      </td>
      <td className="text-wrap">{policy.scopes && policy.scopes.join(" ")}</td>
      <td className="tbl-td">
        <PolicyOptions policy={policy} />
      </td>
    </tr>
  );
}

export default function PoliciesTable(props: Readonly<PoliciesTableProps>) {
  const { policies } = props;
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="tbl-tr">
            <th className="tbl-th text-left">Name</th>
            <th className="tbl-th text-left">Scopes</th>
            <th className="tbl-th text-center" />
          </tr>
        </thead>
        <tbody>
          {policies.map(policy => (
            <Row key={policy.id} policy={policy} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
