// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Description, Field, Label } from "@/components/form";

export function RegenerateClientSecret() {
  return (
    <Field>
      <Label>Regenerate Client Secret</Label>
      <Description>Generate a new secret for this client</Description>
      <Button className="btn-secondary">Regenerate Secret</Button>
    </Field>
  );
}
