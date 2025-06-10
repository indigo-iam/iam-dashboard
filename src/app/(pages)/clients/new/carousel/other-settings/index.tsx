// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { CarouselPanel } from "@/components/carousel";
import { Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";

type OtherSettingsProps = {
  goBack: () => void;
};

export default function OtherSettings(props: Readonly<OtherSettingsProps>) {
  const { goBack } = props;
  const canSave = true;
  return (
    <CarouselPanel unmount={false} className="flex flex-col gap-4">
      <Field>
        <Label>Home Page</Label>
        <Input
          placeholder="https://app.example.org"
          type="url"
          name="client_uri"
        />
      </Field>
      <Field>
        <Label>Term of Service</Label>
        <Input
          placeholder="https://app.example.org/tos.html"
          type="url"
          name="tos_uri"
        />
      </Field>
      <Field>
        <Label>Policy Statement</Label>
        <Input
          placeholder="https://app.example.org/policy.html"
          type="url"
          name="policy_uri"
        />
      </Field>
      <div className="flex flex-row justify-end py-2">
        <Button className="btn-tertiary" onClick={goBack}>
          Back
        </Button>
        <Button className="btn-primary" type="submit" disabled={!canSave}>
          Save
        </Button>
      </div>
    </CarouselPanel>
  );
}
