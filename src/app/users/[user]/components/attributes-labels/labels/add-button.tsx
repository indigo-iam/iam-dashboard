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

function validatePrefix(s: string) {
  return {
    startsWithLettersOrDigits: /^[A-Za-z0-9]/.test(s),
    hasAtLeastTwoCharactersBeforeDot:
      /^[A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9].*/.test(s),
    hasDot: /.*\..*/.test(s),
    betweenTwoAndSixCharsAfterDot: /.*\.[A-Za-z0-9-]{2,6}$/.test(s),
    endsWithLetterOrDigit: /.*[A-Za-z0-9]$/.test(s),
    isValid: /^[A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9].[A-Za-z]{2,6}$/.test(s),
  };
}

function validateName(s: string) {
  return {
    startWithLetterOrDigit: /^[A-Za-z0-9]/.test(s),
    containsOnlyValidCharacters: /^[a-zA-Z0-9-_.]*$/.test(s),
    isValid: /^[a-zA-Z][a-zA-Z0-9-_.]*/.test(s),
  };
}

type AddLabelModalProps = ModalProps & {
  userId: string;
};

function AddLabelModal(props: Readonly<AddLabelModalProps>) {
  const { userId, show, onClose } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [prefix, setPrefix] = useState("");
  const [name, setName] = useState("");

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const prefix = (formData.get("prefix") as string | null) ?? "";
    const name = (formData.get("name") as string | null) ?? "";
    const res = await addUserLabel(userId, prefix, name);
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

  const prefixValidator = validatePrefix(prefix);
  const nameValidator = validateName(name);

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
            <ul className="list-disc px-4 pt-2 text-xs" hidden={!prefix}>
              <li
                className="data-[invalid='true']:text-danger"
                data-invalid={!prefixValidator.startsWithLettersOrDigits}
              >
                Must start with a letter or digit
              </li>
              <li
                className="data-[invalid='true']:text-danger"
                data-invalid={!prefixValidator.hasAtLeastTwoCharactersBeforeDot}
              >
                Must have between 2 and 63 letters, digits or{" "}
                <span className="font-code">-</span> before{" "}
                <span className="font-code">.</span>
              </li>
              <li
                className="data-[invalid='true']:text-danger"
                data-invalid={!prefixValidator.hasDot}
              >
                Must have a <span className="font-code">.</span>
              </li>
              <li
                className="data-[invalid='true']:text-danger"
                data-invalid={!prefixValidator.betweenTwoAndSixCharsAfterDot}
              >
                Must have between 2 and 6 letters and digits, or{" "}
                <span className="font-code">-</span> following{" "}
                <span className="font-code">.</span>
              </li>
              <li
                className="data-[invalid='true']:text-danger"
                data-invalid={!prefixValidator.endsWithLetterOrDigit}
              >
                Must end with a letter or digit
              </li>
            </ul>
          </Field>
          <Field>
            <Label data-required>Name</Label>
            <Input
              name="name"
              placeholder="cern_person_id"
              required
              onChange={e => setName(e.currentTarget.value)}
            />
            <ul className="list-disc px-6 pt-2 text-xs" hidden={!name}>
              <li
                className="data-[invalid='true']:text-danger"
                data-invalid={!nameValidator.startWithLetterOrDigit}
              >
                Must start with a letter or digit
              </li>
              <li
                className="data-[invalid='true']:text-danger"
                data-invalid={!nameValidator.containsOnlyValidCharacters}
              >
                Must contain only letters, digits,{" "}
                <span className="font-code">_</span> or{" "}
                <span className="font-code">-</span>
              </li>
            </ul>
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset" onClick={resetStates}>
            Reset
          </Button>
          <Button
            className="btn-secondary"
            type="submit"
            disabled={!prefixValidator.isValid || !nameValidator.isValid}
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
