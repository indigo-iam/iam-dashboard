"use client";
import { Button } from "@/components/buttons";
import { Field, Form, Label, Select } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import TextArea from "@/components/textarea";
import { User } from "@/models/scim";
import { sendCertificateLinkRequest } from "@/services/certs";
import { useState } from "react";

type CertificateType = "pem" | "issuer";

function CertificateTypeRadio(
  props: Readonly<{ callback: (value: CertificateType) => void }>
) {
  const { callback } = props;
  return (
    <Field>
      <Label>How would you like to specify the certificate?</Label>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <input
            id="pem"
            type="radio"
            name="format"
            defaultChecked
            onClick={() => callback("pem")}
          />
          <label htmlFor="pem">As PEM content</label>
        </div>
        <div className="flex flex-row items-center gap-2">
          <input
            id="sub"
            type="radio"
            name="format"
            onClick={() => callback("issuer")}
          />
          <label htmlFor="sub">From Subject and Issuer</label>
        </div>
      </div>
    </Field>
  );
}

function PEMField() {
  return (
    <Field>
      <Label required>Certificate</Label>
      <TextArea name="certificate" required placeholder="Certificate..." />
    </Field>
  );
}

function IssuerField() {
  return (
    <Field>
      <Label required>Issuer</Label>
      <Select name="issuer" disabled>
        <option>No options</option>
      </Select>
    </Field>
  );
}

interface LinkCertificateModalProps extends ModalProps {
  user: User;
  issuers?: [];
}

export default function LinkCertificateModal(
  props: Readonly<LinkCertificateModalProps>
) {
  const { user, issuers, show, onClose } = props;
  const [format, setFormat] = useState<CertificateType>("pem");
  const close = () => {
    onClose();
    setTimeout(() => setFormat("pem"), 500);
  };
  const action = async (formData: FormData) => {
    const label = formData.get("label") as string;
    const pemEncodedCertificate = formData.get("certificate") as string;
    const notes = formData.get("notes") as string | undefined;
    await sendCertificateLinkRequest({ label, pemEncodedCertificate, notes });
    close();
  };
  return (
    <Modal show={show} onClose={close} title="Request Certificate Linking">
      <Form action={action}>
        <ModalBody>
          <p>
            <b>User</b> {user.displayName}
          </p>
          <Field>
            <Label required>Label</Label>
            <Input required name="label" placeholder="Label..." />
          </Field>
          {issuers ? <CertificateTypeRadio callback={setFormat} /> : null}
          {format === "pem" ? <PEMField /> : <IssuerField />}
          <Field>
            <Label>Optional Request Notes</Label>
            <TextArea name="notes" placeholder="Notes..." />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button type="reset" onClick={close}>
            Cancel
          </Button>
          <Button type="reset">Reset</Button>
          <Button type="submit">Add Certificate</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
