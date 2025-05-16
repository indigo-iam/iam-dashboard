// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { CarouselPanel } from "@/components/carousel";
import { Input } from "@/components/inputs";
import { Section } from "@/components/layout";
import { useFormStatus } from "@/utils/forms";
import { Field, Label, Description } from "@/components/form";

type GeneralSettingsProps = {
  id: string;
};

export default function GeneralSettings(props: Readonly<GeneralSettingsProps>) {
  const { id } = props;
  const { updateFormStatus } = useFormStatus();

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateFormStatus(id, value.length >= 4);
  };

  return (
    <CarouselPanel unmount={false}>
      <Section title="General Settings">
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
      </Section>
    </CarouselPanel>
  );
}
