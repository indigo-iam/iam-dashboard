// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Option, Select } from "@/components/select";
import { AccountType } from "@/models/scope-policies";

const accountOptions: AccountType[] = ["ALL", "USER", "GROUP"];

type AccountGroupSelectorProps = {
  defaultValue: AccountType;
  onChange: (accountType: AccountType) => void;
};

export function AccountGroupSelector(
  props: Readonly<AccountGroupSelectorProps>
) {
  const { defaultValue, onChange } = props;

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selected = event.currentTarget.value;
    if (selected !== "ALL" && selected !== "USER" && selected !== "GROUP") {
      throw new Error(`AccountType '${selected}'' not valid`);
    }
    onChange(selected);
  }

  return (
    <Select
      name="accountType"
      defaultValue={defaultValue}
      onChange={handleChange}
    >
      {accountOptions.map(accountType => (
        <Option key={accountType} value={accountType}>
          {accountType}
        </Option>
      ))}
    </Select>
  );
}
