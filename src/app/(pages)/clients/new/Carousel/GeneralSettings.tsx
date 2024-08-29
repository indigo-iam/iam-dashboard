import { CarouselPanel } from "@/components/Carousel";
import Field from "@/components/Field";
import { Input, InputList } from "@/components/Inputs";
import Label from "@/components/Label";
import Section from "@/components/Section";
import { useEffect, useState } from "react";

type GeneralSettingsProps = {
  onChange?: (fulfilled: boolean) => void;
};

export default function GeneralSettings(props: Readonly<GeneralSettingsProps>) {
  const { onChange } = props;
  const [clientName, setClientName] = useState<string>();

  useEffect(() => {
    const fulfilled = !!clientName;
    onChange?.(fulfilled);
  }, [clientName, onChange]);

  return (
    <CarouselPanel unmount={false}>
      <Section title="General Settings">
        <Field>
          <Label required>Client Name</Label>
          <Input
            title="Client Name"
            placeholder="The name of the client..."
            required
            onChange={e => setClientName(e.target.value)}
          />
        </Field>
        <Field>
          <Label>Client Description</Label>
          <Input
            title="Client Description"
            placeholder="Client description..."
          />
        </Field>
        <Field>
          <Label>Redirect URIs</Label>
          <InputList
            originalItems={[]}
            name="redirect-uris"
            type="url"
            placeholder="https://app.exchange.com/callback"
          />
        </Field>
      </Section>
    </CarouselPanel>
  );
}
