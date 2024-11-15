import { CarouselPanel } from "@/components/Carousel";
import { Field, Label } from "@/components/Form";
import { Input } from "@/components/Inputs";
import { Section } from "@/components/Layout";
import { useFormStatus } from "@/utils/forms";
import { useEffect } from "react";

type OtherSettingsProps = {
  id: string;
};

export default function OtherSettings(props: Readonly<OtherSettingsProps>) {
  const { id } = props;
  const { updateFormStatus } = useFormStatus();

  useEffect(() => {
    updateFormStatus(id, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CarouselPanel unmount={false}>
      <Section title="Other Settings">
        <Field>
          <Label>Home Page</Label>
          <Input
            placeholder="https://app.exchange.org"
            type="url"
            name="client_uri"
          />
        </Field>
        <Field>
          <Label>Term of Service</Label>
          <Input
            placeholder="https://app.exchange.org/tos.html"
            type="url"
            name="tos_uri"
          />
        </Field>
        <Field>
          <Label>Policy Statement</Label>
          <Input
            placeholder="https://app.exchange.org/policy.html"
            type="url"
            name="policy_uri"
          />
        </Field>
      </Section>
    </CarouselPanel>
  );
}
