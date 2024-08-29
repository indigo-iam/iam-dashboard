import { CarouselPanel } from "@/components/Carousel";
import Field from "@/components/Field";
import { Input, InputList } from "@/components/Inputs";
import Label from "@/components/Label";
import Section from "@/components/Section";

type GeneralSettingsProps = {
  onChange?: (fulfilled: boolean) => void;
};

export default function GeneralSettings(props: Readonly<GeneralSettingsProps>) {
  const { onChange } = props;

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange?.(!!value);
  };

  return (
    <CarouselPanel unmount={false}>
      <Section title="General Settings">
        <Field>
          <Label required>Client Name</Label>
          <Input
            title="Client Name"
            placeholder="The name of the client..."
            required
            onChange={handleClientNameChange}
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
