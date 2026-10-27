// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Select, Option } from "@/components/select";
import { toast } from "@/components/toaster";
import { Scope } from "@/models/client";
import { editScope } from "@/services/scopes";

type ScopeTypeSelectProps = {
  scope: Scope;
};

export default function ScopeTypeSelect(props: Readonly<ScopeTypeSelectProps>) {
  const { scope } = props;

  const options = [
    { id: "none", name: "None" },
    { id: "default", name: "Default" },
    { id: "restricted", name: "Restricted" },
  ];

  let defaultOption = options[0];
  if (scope.defaultScope) {
    defaultOption = options[1];
  } else if (scope.restricted) {
    defaultOption = options[2];
  }

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const newScope = { ...scope };
    switch (value) {
      case "default": {
        newScope.defaultScope = true;
        newScope.restricted = false;
        break;
      }
      case "restricted": {
        newScope.defaultScope = false;
        newScope.restricted = true;
        break;
      }
      default: {
        newScope.defaultScope = false;
        newScope.restricted = false;
      }
    }
    const res = await editScope(newScope);
    toast.toast(res);
  }

  return (
    <Select
      name="scope-type"
      onChange={handleChange}
      defaultValue={defaultOption.id}
    >
      {options.map(o => (
        <Option key={o.id} value={o.id}>
          {o.name}
        </Option>
      ))}
    </Select>
  );
}
