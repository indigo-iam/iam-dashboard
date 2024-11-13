import Link from "@/components/Link";
import { AUP } from "@/models/aup";
import { dateToHuman } from "@/utils/dates";
import EditButton from "./EditButton";
import RequestSignatureButton from "./RequestSignatureButton";
import DeleteButton from "./DeleteButton";
import Field from "@/components/Field";
import Label from "@/components/Label";
import Description from "@/components/Description";
import { Form } from "@/components/Form";

type AupViewProps = {
  aup: AUP;
};

export default function AupView(props: Readonly<AupViewProps>) {
  const { aup } = props;
  return (
    <>
      <Form className="space-y-2">
        <Field>
          <Label>Acceptable Usage Policy URL</Label>
          <p>
            <Link href={aup.url}>{aup.url}</Link>
          </p>
          <Description>
            The URL above is presented to users at registration time or
            periodically if the AUP is configured for periodic re-acceptance.
          </Description>
        </Field>
        <Field>
          <Label>Created</Label>
          <p>{dateToHuman(new Date(aup.creationTime))}</p>
        </Field>
        <Field>
          <Label>Last updated</Label>
          <p>{dateToHuman(new Date(aup.lastUpdateTime))}</p>
        </Field>
        <Field>
          <Label>Signature Validity (in days)</Label>
          <p>{aup.signatureValidityInDays}</p>
          <Description>
            If set to a positive value, users will be prompted periodically for
            an AUP signature (with the period defined in days). If set to zero,
            the AUP signature will be asked only at registration time.
          </Description>
        </Field>
        <Field>
          <Label>AUP Reminders (in days)</Label>
          <p>{aup.aupRemindersInDays}</p>
          <Description>
            Indicate a sequence of three days representing how many days before
            the AUP expiration reminder messages must be sent.
          </Description>
        </Field>
      </Form>
      <div className="flex flex-row gap-2">
        <EditButton aup={aup} />
        <RequestSignatureButton />
        <DeleteButton />
      </div>
    </>
  );
}
