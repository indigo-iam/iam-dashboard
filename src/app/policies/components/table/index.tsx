// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "@/components/link";
import { ListItem, UnorderedList } from "@/components/list";
import { ScopePolicy } from "@/models/scope-policies";

import PolicyOptions from "./options";

type RowProps = {
  policy: ScopePolicy;
  readWrite?: boolean;
};

function Row(props: Readonly<RowProps>) {
  const { policy, readWrite } = props;
  const scopes = policy.scopes ? policy.scopes.join(" ") : "";
  return (
    <ListItem>
      <Link
        className="flex grow flex-col text-gray-950 dark:text-gray-200"
        href={`/policies/${policy.id}`}
      >
        {policy.description}
        <p className="truncate text-sm font-light italic">{scopes}</p>
      </Link>
      {readWrite && <PolicyOptions policy={policy} />}
    </ListItem>
  );
}

type PoliciesTableProps = {
  policies: ScopePolicy[];
};

export default function PoliciesTable(props: Readonly<PoliciesTableProps>) {
  const { policies } = props;
  return (
    <UnorderedList>
      {policies.map(policy => (
        <Row key={policy.id} policy={policy} />
      ))}
    </UnorderedList>
  );
}
