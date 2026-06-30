// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@/components/modal";
import { toast } from "@/components/toaster";
import { addUserLabel } from "@/services/users";

type ValidatePrefixViewProps = {
  prefix: string;
};

function ValidatePrefixView(props: Readonly<ValidatePrefixViewProps>) {
  const { prefix } = props;
  const startsWithLettersOrDigits = /^[A-Za-z0-9]/.test(prefix);
  const hasAtLeastTwoCharactersBeforeDot =
    /^[A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9].*/.test(prefix);
  const hasDot = /\./.test(prefix);
  const betweenTwoAndSixCharsAfterDot = /\.[A-Za-z0-9]{2,6}$/.test(prefix);
  const endsWithLetterOrDigit = /[A-Za-z0-9]$/.test(prefix);
  return (
    <ul className="list-disc px-4 pt-2 text-xs">
      <li
        className="data-[invalid='true']:text-danger"
        data-invalid={!startsWithLettersOrDigits}
      >
        Must start with a letter or digit
      </li>
      <li
        className="data-[invalid='true']:text-danger"
        data-invalid={!hasAtLeastTwoCharactersBeforeDot}
      >
        Must have between 2 and 63 letters, numbers or{" "}
        <span className="font-code">-</span> before{" "}
        <span className="font-code">.</span>
      </li>
      <li className="data-[invalid='true']:text-danger" data-invalid={!hasDot}>
        Must have a <span className="font-code">.</span>
      </li>
      <li
        className="data-[invalid='true']:text-danger"
        data-invalid={!betweenTwoAndSixCharsAfterDot}
      >
        Must have between 2 and 6 letters and numbers following{" "}
        <span className="font-code">.</span>
      </li>
      <li
        className="data-[invalid='true']:text-danger"
        data-invalid={!endsWithLetterOrDigit}
      >
        Must end with a letter or number
      </li>
    </ul>
  );
}

type ValidateNameViewProps = {
  name: string;
};

function ValidateNameView(props: Readonly<ValidateNameViewProps>) {
  const { name } = props;
  const startWithLetterOrDigit = /^[A-Za-z0-9]/.test(name);
  const containsOnlyValidCharacters = /^[a-zA-Z0-9-_.]*$/.test(name);
  return (
    <ul className="list-disc px-6 pt-2 text-xs">
      <li
        className="data-[invalid='true']:text-danger"
        data-invalid={!startWithLetterOrDigit}
      >
        Must start with a letter or number
      </li>
      <li
        className="data-[invalid='true']:text-danger"
        data-invalid={!containsOnlyValidCharacters}
      >
        Must contain only letters, digits, <span className="font-code">_</span>{" "}
        or <span className="font-code">-</span>
      </li>
    </ul>
  );
}

type AddLabelModalProps = ModalProps & {
  userId: string;
};

function AddLabelModal(props: Readonly<AddLabelModalProps>) {
  const { userId, show, onClose } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [prefix, setPrefix] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState<string | null>(null);

  const prefixIsValid =
    /^[A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9].[A-Za-z]{2,6}$/.test(prefix);
  const nameIsValid = /^[a-zA-Z][a-zA-Z0-9-_.]*/.test(name);

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const prefix = (formData.get("prefix") as string | null) ?? "";
    const name = (formData.get("name") as string | null) ?? "";
    const value = formData.get("value") as string | null;
    const res = await addUserLabel(userId, prefix, name, value);
    if (res) {
      toast.toast(res);
    }
    onClose();
  }

  function resetStates() {
    setPrefix("");
    setName("");
  }

  function resetForm() {
    formRef.current?.reset();
  }

  function closeAndReset() {
    onClose();
    setTimeout(() => {
      resetStates();
      resetForm();
    }, 300);
  }

  return (
    <Modal show={show} onClose={closeAndReset}>
      <ModalHeader onClose={closeAndReset}>Add user label</ModalHeader>
      <Form onSubmit={submit} ref={formRef}>
        <ModalBody>
          <Field>
            <Label data-required>Prefix</Label>
            <Input
              name="prefix"
              placeholder="hr.cern"
              onChange={e => setPrefix(e.currentTarget.value)}
              required
            />
            {prefix && <ValidatePrefixView prefix={prefix} />}
          </Field>
          <Field>
            <Label data-required>Name</Label>
            <Input
              name="name"
              placeholder="cern_person_id"
              required
              onChange={e => setName(e.currentTarget.value)}
            />
            {name && <ValidateNameView name={name} />}
          </Field>
          <Field>
            <Label>Value</Label>
            <Input
              name="value"
              placeholder="123456"
              onChange={e => setValue(e.currentTarget.value)}
            />
            {value && <ValidateNameView name={value} />}
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-tertiary"
            type="button"
            onClick={closeAndReset}
          >
            Cancel
          </Button>
          <Button className="btn-secondary" type="reset" onClick={resetStates}>
            Reset
          </Button>
          <Button
            className="btn-primary"
            type="submit"
            disabled={!prefixIsValid || !nameIsValid}
          >
            Add label
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

type AddLabelButtonProps = {
  userId: string;
};

export function AddLabelButton(props: Readonly<AddLabelButtonProps>) {
  const { userId } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" onClick={open}>
        Add label
      </Button>
      <AddLabelModal userId={userId} show={show} onClose={close} />
    </>
  );
}
