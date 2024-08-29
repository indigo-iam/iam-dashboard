import { CarouselPanel } from "@/components/Carousel";
import Field from "@/components/Field";
import { Input } from "@/components/Inputs";
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
            name="client_name"
            placeholder="The name of the client..."
            required
            onChange={handleClientNameChange}
          />
        </Field>
        <Field>
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
