// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { CarouselPanel } from "@/components/carousel";
import { Field, Label, Description } from "@/components/form";
import { Input } from "@/components/inputs";
import { useState } from "react";

type GeneralSettingsProps = {
  goBack: () => void;
  goNext: () => void;
};

export default function GeneralSettings(props: Readonly<GeneralSettingsProps>) {
  const { goBack, goNext } = props;
  const [name, setName] = useState("");

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const canContinue = name.length >= 4;

  return (
    <CarouselPanel className="flex flex-col gap-2" id="culo" unmount={false}>
      <Field className="flex flex-col">
        <Label data-required>Client Name</Label>
        <Description>
          Client name must be at least four characters long.
        </Description>
        <Input
          title="Client Name"
          name="client_name"
          placeholder="The name of the client..."
          required
          onChange={handleClientNameChange}
        />
      </Field>
      <Field className="flex flex-col gap-2">
        <Label>Client Description</Label>
        <Input
          title="Client Description"
          name="client_description"
          placeholder="Client description..."
        />
      </Field>
      <div className="flex flex-row justify-end py-2">
        <Button className="btn-tertiary" onClick={goBack}>
          Back
        </Button>
        <Button
          className="btn-secondary"
          onClick={goNext}
          disabled={!canContinue}
        >
          Continue
        </Button>
      </div>
    </CarouselPanel>
  );
}
