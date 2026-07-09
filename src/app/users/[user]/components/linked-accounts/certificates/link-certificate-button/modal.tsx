// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { Field, Form, Label, Select } from "@/components/form";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@/components/modal";
import { Textarea } from "@/components/textarea";
import { toast } from "@/components/toaster";
import { linkCertificate, sendCertificateLinkRequest } from "@/services/certs";
import { useProgressBar } from "@/components/progress-bar";

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
  const placeholder =
    "-----BEGIN PKCS12-----\nMIIF2gIBAzCCBf8GCSqGSIb3DQEHAaCCBf8wggVgMI...\n-----END PKCS12-----";
  return (
    <Field>
      <Label data-required>Certificate</Label>
      <Textarea
        name="certificate"
        className="iam-input w-full"
        required
        placeholder={placeholder}
        rows={3}
      />
    </Field>
  );
}

function IssuerField() {
  return (
    <Field>
      <Label data-required>Issuer</Label>
      <Select name="issuer" disabled>
        <option>No options</option>
      </Select>
    </Field>
  );
}

type RequestCertificateLinkingModalProps = ModalProps & {
  userName: string;
  issuers?: [];
};

function RequestCertificateLinkingModal(
  props: Readonly<RequestCertificateLinkingModalProps>
) {
  const { userName, issuers, show, onClose } = props;
  const [format, setFormat] = useState<CertificateType>("pem");
  const close = () => {
    onClose();
    setTimeout(() => setFormat("pem"), 500);
  };

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const label = formData.get("label") as string;
    const pemEncodedCertificate = formData.get("certificate") as string;
    const notes = formData.get("notes") as string | undefined;
    const res = await sendCertificateLinkRequest({
      label,
      pemEncodedCertificate,
      notes,
    });
    toast.toast(res);
    close();
  }
  return (
    <Modal show={show} onClose={close}>
      <ModalHeader onClose={close}>Request Certificate Linking</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label>User</Label>
            <Input defaultValue={userName} disabled />
          </Field>
          <Field>
            <Label data-required>Label</Label>
            <Input
              required
              name="label"
              placeholder="Add a label to the certificate"
            />
          </Field>
          {issuers ? <CertificateTypeRadio callback={setFormat} /> : null}
          {format === "pem" ? <PEMField /> : <IssuerField />}
          <Field>
            <Label>Optional Request Notes</Label>
            <Textarea
              name="notes"
              className="iam-input w-full"
              placeholder="Additional notes"
            />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset" onClick={close}>
            Cancel
          </Button>
          <Button className="btn-secondary" type="reset">
            Reset
          </Button>
          <Button className="btn-primary" type="submit">
            Add Certificate
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

type LinkCertificateModalProps = ModalProps & {
  userId: string;
  userName: string;
};

function LinkCertificateModal(props: Readonly<LinkCertificateModalProps>) {
  const { show, onClose, userId, userName } = props;
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { startTransition } = useProgressBar();

  function close() {
    onClose();
    setError(null);
  }

  function submit() {
    if (!formRef.current) {
      console.warn("formRef is null");
      return;
    }
    const formData = new FormData(formRef.current);
    const label = formData.get("label") as string;
    const cert = formData.get("certificate") as string;
    if (!label || !cert) {
      return;
    }
    startTransition(async () => {
      const res = await linkCertificate(userId, label, cert);
      toast.toast(res);
      if (res.type === "error") {
        setError(res.description ?? "unknown error");
      } else {
        formRef.current?.reset();
        close();
      }
    });
  }

  return (
    <ConfirmModal
      title="Link certificate"
      show={show}
      onClose={close}
      formRef={formRef}
      onConfirm={submit}
      autoclose={false}
    >
      <Field>
        <Label>Username</Label>
        <Input value={userName} disabled />
      </Field>
      <Field>
        <Label data-required>Label</Label>
        <Input name="label" placeholder="example" required />
      </Field>
      <Field>
        <Label data-required>Certificate</Label>
        <Textarea
          name="certificate"
          placeholder="PEM encoded certificate..."
          className="iam-input"
          required
          rows={8}
        />
      </Field>
      {error && <p className="text-danger">{error}</p>}
    </ConfirmModal>
  );
}

type CertificateModalProps = ModalProps & {
  isAdmin: boolean;
  userId: string;
  userName: string;
};

export default function CertificateModal(
  props: Readonly<CertificateModalProps>
) {
  const { show, onClose, isAdmin, userId, userName } = props;
  if (isAdmin) {
    return (
      <LinkCertificateModal
        show={show}
        onClose={onClose}
        userId={userId}
        userName={userName}
      />
    );
  }
  return (
    <RequestCertificateLinkingModal
      show={show}
      onClose={onClose}
      userName={userName}
    />
  );
}
