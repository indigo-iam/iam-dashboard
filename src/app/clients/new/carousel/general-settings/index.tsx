// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { useState } from "react";

import { Button } from "@/components/buttons";
import { CarouselPanel } from "@/components/carousel";
import { Description } from "@/components/description";
import { Field } from "@/components/field";
import { Label } from "@/components/label";
import { Input } from "@/components/inputs";

type GeneralSettingsProps = {
  goNext: () => void;
};

export default function GeneralSettings(props: Readonly<GeneralSettingsProps>) {
  const { goNext } = props;
  const [name, setName] = useState("");

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const canContinue = name.length >= 4;

  return (
    <CarouselPanel className="panel flex flex-col gap-2" unmount={false}>
      <h2>General Settings</h2>
      <Field>
        <Label>Client Name</Label>
        <Input
          title="Client Name"
          name="client_name"
          placeholder="The name of the client"
          required
          onChange={handleClientNameChange}
        />
        <Description>
          Client name must be at least four characters long.
        </Description>
      </Field>
      <Field>
        <Label>Client Description</Label>
        <Input
          title="Client Description"
          name="client_description"
          placeholder="Client description"
        />
      </Field>
      <div className="flex flex-row justify-end py-2">
        <Button
          variant="outline"
          onClick={goNext}
          disabled={!canContinue}
          type="button"
        >
          Continue
        </Button>
      </div>
    </CarouselPanel>
  );
}
