// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalBody,
  ModalFooter,
  type ModalProps,
} from "@/components/modal";
import { Group } from "@/models/groups";
import { editGroup } from "@/services/groups";

import { useState } from "react";

interface EditModalProps extends ModalProps {
  group: Group;
}

function EditModal(props: Readonly<EditModalProps>) {
  const { group, ...modalProps } = props;
  const description =
    group["urn:indigo-dc:scim:schemas:IndigoGroup"].description ?? "";

  async function action(formData: FormData) {
    const description = formData.get("description") as string | null;
    await editGroup(group.id, description);
    props.onClose();
  }

  return (
    <Modal {...modalProps}>
      <Form action={action}>
        <ModalBody>
          <Field>
            <Label>Description</Label>
            <Input
              placeholder="Enter description"
              defaultValue={description}
              name="description"
            />
          </Field>
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
            Submit
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

type EditGroupButtonProps = {
  group: Group;
};

export default function EditGroupButton(props: Readonly<EditGroupButtonProps>) {
  const { group } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" type="button" onClick={open}>
        Edit group
      </Button>
      <EditModal title="Edit group" show={show} onClose={close} group={group} />
    </>
  );
}
