// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Layout } from "@/app/components/layout";
import { Textarea } from "@/components/textarea";
import ConfirmButton from "./components/confirm-button";
import { Description, Field, Label } from "@/components/form";

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
            <Label>Enter Policy</Label>
            <Description>Policy must in as JSON format</Description>
            <Textarea
              className="iam-input w-full font-mono"
              placeholder="Insert policy as valid JSON"
            />
          </Field>
          <ConfirmButton />
        </div>
      </div>
    </Layout>
  );
}
