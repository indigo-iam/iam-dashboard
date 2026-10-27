// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ChevronLeftIcon } from "@heroicons/react/20/solid";

import { Button } from "@/components/buttons";
import { CarouselPanel, useCarousel } from "@/components/carousel";
import { Field } from "@/components/field";
import { Label } from "@/components/label";
import { Input } from "@/components/inputs";

export default function OtherSettings() {
  const canSave = true;
  const actions = useCarousel();
  function goBack() {
    actions.previousTab();
  }
  function goNext() {
    actions.nextTab();
  }
  return (
    <CarouselPanel className="panel flex flex-col gap-2">
      <h2>Other Settings</h2>
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
        <Button variant="underline" onClick={goBack}>
          <ChevronLeftIcon className="size-5" />
          Back
        </Button>
        <Button type="submit" disabled={!canSave} onClick={goNext}>
          Save
        </Button>
      </div>
    </CarouselPanel>
  );
}
