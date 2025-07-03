// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { CarouselPanel } from "@/components/carousel";
import { Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

type OtherSettingsProps = {
  goBack: () => void;
};

export default function OtherSettings(props: Readonly<OtherSettingsProps>) {
  const { goBack } = props;
  const canSave = true;
  return (
    <CarouselPanel className="panel flex w-2xl flex-col gap-2" unmount={false}>
      <h2>Other Settings</h2>
      <Field className="flex flex-col gap-1">
        <Label>Home Page</Label>
        <Input
          placeholder="https://app.example.org"
          type="url"
          name="client_uri"
        />
      </Field>
      <Field className="flex flex-col gap-1">
        <Label>Term of Service</Label>
        <Input
          placeholder="https://app.example.org/tos.html"
          type="url"
          name="tos_uri"
        />
      </Field>
      <Field className="flex flex-col gap-1">
        <Label>Policy Statement</Label>
        <Input
          placeholder="https://app.example.org/policy.html"
          type="url"
          name="policy_uri"
        />
      </Field>
      <div className="flex flex-row justify-end py-2">
        <Button className="btn" onClick={goBack}>
          <div className="flex items-center hover:border-b">
            <ChevronLeftIcon className="-ml-2 size-5" />
            Back
          </div>
        </Button>
        <Button className="btn-primary" type="submit" disabled={!canSave}>
          Save
        </Button>
      </div>
    </CarouselPanel>
  );
}
