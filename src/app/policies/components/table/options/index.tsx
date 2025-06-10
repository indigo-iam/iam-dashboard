// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import { ScopePolicy } from "@/models/scope-policies";
import DeletePolicy from "./delete-policy";

type PolicyOptionsProps = {
  policy: ScopePolicy;
};

export default function PolicyOptions(props: Readonly<PolicyOptionsProps>) {
  const { policy } = props;
  return (
    <Options>
      <DeletePolicy policy={policy} />
    </Options>
  );
}
