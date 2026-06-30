// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/buttons";
import { Form, Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@/components/modal";
import { toast } from "@/components/toaster";
import { addAttribute } from "@/services/users";

function validateField(s: string) {
  return {
    startsWithLetterOrDigit: /^[A-Za-z0-9]+/.test(s),
    hasValidCharacters: /^[A-Za-z0-9\-_.]+$/.test(s),
    hasCorrectNumberOfChars: s.length >= 2 && s.length < 64,
    isValid: /^[A-Za-z0-9][A-Za-z0-9\-_.]{0,62}$/.test(s),
  };
}

type ValidationViewProps = {
  startsWithLetterOrDigit: boolean;
  hasValidCharacters: boolean;
  hasCorrectNumberOfChars: boolean;
};

function ValidationView(props: Readonly<ValidationViewProps>) {
  const {
    startsWithLetterOrDigit,
    hasValidCharacters,
    hasCorrectNumberOfChars,
  } = props;
  return (
    <ul className="list-disc px-4 pt-2 text-xs">
      <li
        className="data-[invalid='true']:text-danger"
        data-invalid={!startsWithLetterOrDigit}
      >
        Must start with a letter or number
      </li>
      <li
        className="data-[invalid='true']:text-danger"
        data-invalid={!hasValidCharacters}
      >
        Must contain only letters, numbers, <span className="font-code">-</span>
        {", "}
        <span className="font-code">_</span>
        {" and"}
        <span className="font-code">.</span>
      </li>
      <li
        className="data-[invalid='true']:text-danger"
        data-invalid={!hasCorrectNumberOfChars}
      >
        Must have a number of characters between 2 and 63
      </li>
    </ul>
  );
}

interface AddAttributeModalProps extends ModalProps {
  userId: string;
}

export default function AddAttributeModal(
  props: Readonly<AddAttributeModalProps>
) {
  const { userId, show, onClose } = props;
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function resetStates() {
    setName("");
    setValue("");
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

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("attr-name") as string;
    const value = formData.get("attr-value") as string;
    const res = await addAttribute(userId, { name, value });
    toast.toast(res);
    closeAndReset();
  }

  const nameValidator = validateField(name);
  const valueValidator = validateField(value);

  return (
    <Modal show={show} onClose={closeAndReset}>
      <ModalHeader onClose={closeAndReset}>Add user attribute</ModalHeader>
      <Form onSubmit={submit} ref={formRef}>
        <ModalBody>
          <Field>
            <Label data-required>Name</Label>
            <Input
              id="attr-name"
              title="Attribute Name"
              name="attr-name"
              placeholder="Attribute name"
              onChange={e => setName(e.currentTarget.value)}
              required
            />
            {name && (
              <ValidationView
                startsWithLetterOrDigit={nameValidator.startsWithLetterOrDigit}
                hasValidCharacters={nameValidator.hasValidCharacters}
                hasCorrectNumberOfChars={nameValidator.hasCorrectNumberOfChars}
              />
            )}
          </Field>
          <Field>
            <Label data-required>Value</Label>
            <Input
              id="attr-value"
              title="Attribute Value"
              name="attr-value"
              placeholder="Attribute value"
              onChange={e => setValue(e.currentTarget.value)}
              required
            />
            {value && (
              <ValidationView
                startsWithLetterOrDigit={valueValidator.startsWithLetterOrDigit}
                hasValidCharacters={valueValidator.hasValidCharacters}
                hasCorrectNumberOfChars={valueValidator.hasCorrectNumberOfChars}
              />
            )}
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
            disabled={!nameValidator.isValid || !valueValidator.isValid}
          >
            Add attribute
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
