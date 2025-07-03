// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Description, Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Group, GroupLabel } from "@/models/groups";
import { addGroupLabel } from "@/services/groups";
import { Fieldset } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface AddLabelModalProps extends ModalProps {
  group: Group;
}

function AddLabelModal(props: Readonly<AddLabelModalProps>) {
  const { group, ...modalProps } = props;
  const action = async (formData: FormData) => {
    let gl: GroupLabel = {
      name: formData.get("name") as string,
      value: (formData.get("value") as string | undefined) ?? "",
    };
    const prefix = formData.has("prefix")
      ? (formData.get("prefix") as string)
      : undefined;
    if (prefix) {
      gl = { ...gl, prefix };
    }
    await addGroupLabel(group.id, gl);
    modalProps.onClose();
  };

  return (
    <Modal {...modalProps}>
      <Form action={action}>
        <ModalBody>
          <Fieldset>
            <Field>
              <Label data-required>Name</Label>
              <Input name="name" type="text" required />
            </Field>
            <Field>
              <Label>Value</Label>
              <Description>Some description</Description>
              <Input name="value" type="text" />
            </Field>
            <Field>
              <Label>Prefix</Label>
              <Description>Some description</Description>
              <Input name="prefix" type="text" />
            </Field>
          </Fieldset>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-tertiary"
            type="reset"
            onClick={modalProps.onClose}
          >
            Cancel
          </Button>
          <Button className="btn-primary" type="submit">
            Add label
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

type AddLabelProps = {
  group: Group;
};

export function AddLabel(props: Readonly<AddLabelProps>) {
  const { group } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <AddLabelModal
        title="Add Group Label"
        group={group}
        show={show}
        onClose={close}
      />
      <Button
        title="Add group label"
        className="bg-light-gray dark:bg-gray hover:dark:bg-light-gray/60 flex items-center rounded-full py-0.5 pr-3 pl-1 text-sm hover:bg-gray-400/60"
        type="button"
        onClick={open}
      >
        <PlusIcon className="size-4" />
        Add label
      </Button>
    </>
  );
}
