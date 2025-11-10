// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Layout } from "@/app/components/layout";
import { Field, Label, Description, Select, SelectOption } from "@/components/form";
import { Input } from "@/components/inputs";

const ruleOptions = [
  {id: "permit", name: "PERMIT"},
  {id: "deny", name: "DENY"}
];

const defaultVal = {id: "value", name: "VALUE"};

export default async function Policies() {
  return (
    <Layout title="Create Scope Policy">
      <div className="space-y-4">
        <p className="font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in
          accumsan leo. Suspendisse potenti. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
          Vestibulum a metus sed ipsum sodales laoreet ac efficitur mi. Integer
          tempus sit amet enim eget consequat. Phasellus sit amet fringilla mi,
          id hendrerit quam.
        </p>
        <div className="panel space-y-4">
          <Field>
            <Label>Description</Label>
            <Description>Something users will recognize and trust.</Description>
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
              <Description>Something users will recognize and trust.</Description>
              <div className="flex gap-1">
                <Select name="rule" defaultValue={defaultVal}>
                  {ruleOptions.map(rule => (
                    <SelectOption key={rule.id} value={rule}>
                      {rule.name}
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
      </div>
    </Layout>
  );
}
