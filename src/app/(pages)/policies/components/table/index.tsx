// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

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
    <div className="iam-list-item flex flex-row">
      <Link
        className="flex grow flex-col font-bold hover:underline"
        href={`/policies/${policy.id}`}
      >
        {policy.description}
        <small className="font-light">{scopes}</small>
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
