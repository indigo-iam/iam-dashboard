import { CarouselPanel } from "@/components/Carousel";
import Field from "@/components/Field";
import { Input, InputList } from "@/components/Inputs";
import Label from "@/components/Label";
import Section from "@/components/Section";

export default function GeneralSettings() {
  return (
    <CarouselPanel unmount={false}>
      <Section title="General Settings">
        <Field>
          <Label required>Client Name</Label>
          <Input
            title="Client Name"
            placeholder="The name of the client..."
            required
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
