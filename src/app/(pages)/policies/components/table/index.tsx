import Link from "next/link";
import { ScopePolicy } from "@/models/scope-policies";
import PolicyOptions from "./options";

type PoliciesTableProps = {
  policies: ScopePolicy[];
};

function Row(props: Readonly<{ policy: ScopePolicy }>) {
  const { policy } = props;
  const scopes = policy.scopes ? policy.scopes.join(" ") : "";
  return (
    <div className="flex flex-row border-b p-2 last:border-b-0 hover:rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-200/10">
      <Link
        className="flex grow flex-col font-bold hover:underline"
        href={`/policies/${policy.id}`}
      >
        {policy.description}
        <small className="iam-text-light">{scopes}</small>
      </Link>
      <PolicyOptions policy={policy} />
    </div>
  );
}

export default function PoliciesTable(props: Readonly<PoliciesTableProps>) {
  const { policies } = props;
  return (
    <div className="overflow-x-auto">
      <div>
        {policies.map(policy => (
          <Row key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  );
}
