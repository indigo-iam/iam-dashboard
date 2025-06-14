// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Form, Description, Field, Label } from "@/components/form";
import { Select, SelectOption } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Button } from "@/components/buttons";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { addScope } from "@/services/scopes";

interface NewScopeModalProps extends ModalProps {}

export default function NewScopeModal(props: Readonly<NewScopeModalProps>) {
  const { show, onClose } = props;
  const options = [
    { id: "none", name: "None" },
    { id: "default", name: "Default" },
    { id: "restricted", name: "Restricted" },
  ];
  const [scopeType, setScopeType] = useState(options[0]);

  const action = async (formData: FormData) => {
    const value = formData.get("value") as string;
    const description = formData.get("description") as string;
    const defaultScope = scopeType.id === "default";
    const restricted = scopeType.id === "restricted";
    const icon = "";
    await addScope({ value, description, defaultScope, restricted, icon });
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose} title="Add New Scope">
      <Form action={action} onReset={() => setScopeType(options[0])}>
        <ModalBody className="space-y-4 pb-4">
          <Field>
            <Label>Scope</Label>
            <Description>Single string with no spaces.</Description>
            <Input id="scope" name="value" placeholder="Scope name" />
          </Field>
          <Field>
            <Label>Description</Label>
            <Description>Single string with no spaces.</Description>
            <Input
              id="scope"
              name="description"
              placeholder="Scope description"
            />
          </Field>
          <Field>
            <Label>Scope Type</Label>
            <Description>
              <b>Default</b>: newly-created clients get this scope by default.{" "}
              <br />
              <b>Restricted</b>: only usable by system administrators and are
              unavailable to dynamically registered clients and protected
              resources. <br />
              <b>None</b>: none of above.
            </Description>
            <Select name="scope-type" defaultValue={scopeType}>
              {options.map(option => (
                <SelectOption key={option.id} value={option}>
                  {option.name}
                </SelectOption>
              ))}
            </Select>
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button className="btn-secondary" type="reset">
            Reset
          </Button>
          <Button className="btn-primary" type="submit">
            <PlusIcon className="my-auto size-5" />
            Add Scope
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
