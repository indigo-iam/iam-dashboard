// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Field, Label, Description, Select, SelectOption } from "@/components/form";
import { Input } from "@/components/inputs";

const ruleOptions = [
  {id: "permit", name: "PERMIT"},
  {id: "deny", name: "DENY"}
];

const matchingPolicyOptions = [
  {id: "eq", name: "EQ"},
  {id: "regexp", name: "REGEXP"},
  {id: "path", name: "PATH"}
];

const defaultVal = {id: "value", name: "VALUE"};

export default function ScopePoliciesForm() {
  return (
    <div className="panel space-y-4">
      <Field>
        <Label>Description</Label>
        <Description>Something users will recognize and trust</Description>
        <Input 
          type="text"
          name="description"
          title="Description"
          placeholder="Default Permit ALL policy"
          required
        />
      </Field>

      <div className="flex gap-3">
        <Field>
          <Label>Rule</Label>
          <Description>Select Permit or Deny</Description>
          <Select name="rule" defaultValue={defaultVal}>
            {ruleOptions.map(rule => (
              <SelectOption key={rule.id} value={rule}>
              {rule.name}
              </SelectOption>
            ))}
          </Select>
        </Field>

        <Field className="grow">
          <Label>Matching Policy</Label>
          <Description>Select the mathing policy and write the following string/regular expression/wlcg</Description>
          <div className="flex gap-1">
            <Select name="rule" defaultValue={defaultVal}>
              {matchingPolicyOptions.map(mp => (
              <SelectOption key={mp.id} value={mp}>
                  {mp.name}
              </SelectOption>
              ))}
            </Select>
            <Input 
              type="text"
              name="description"
              title="Description"
              placeholder="String / Regular expression / WLCG"
              required
            />
          </div>
        </Field>
      </div>
    </div>
  );
}
