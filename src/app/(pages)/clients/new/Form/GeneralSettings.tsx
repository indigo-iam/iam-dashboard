import { CarouselPanel } from "@/components/Carousel";
import { Input } from "@/components/Inputs";
import Section from "@/components/Section";
import { useFormStatus } from "@/utils/forms";
import { Field, Label, Description } from "@/components/Form";

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
        <Field>
          <Label required>Client Name</Label>
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
