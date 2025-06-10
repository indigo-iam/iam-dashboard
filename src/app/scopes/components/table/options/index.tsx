// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import { Scope } from "@/models/client";
import DeleteButton from "./delete-button";
import EditScope from "./edit-scope.tsx";

type ScopeOptionsProps = {
  scope: Scope;
};

export default function ScopeOptions(props: Readonly<ScopeOptionsProps>) {
  const { scope } = props;
  return (
    <Options>
      <EditScope scope={scope} />
      <DeleteButton scope={scope} />
    </Options>
  );
}
