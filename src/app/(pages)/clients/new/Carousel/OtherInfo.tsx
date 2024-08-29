import { CarouselPanel } from "@/components/Carousel";
import Field from "@/components/Field";
import { Input } from "@/components/Inputs";
import Label from "@/components/Label";
import Section from "@/components/Section";

export default function OtherInfo() {
  return (
    <CarouselPanel unmount={false}>
      <Section title="Other Info">
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
