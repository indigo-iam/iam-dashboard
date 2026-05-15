// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Description, Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { toaster } from "@/components/toaster";
import { Group } from "@/models/groups";
import { addSubgroup } from "@/services/groups";

interface AddSubgroupModalProps extends ModalProps {
  rootGroup: Group;
  onAdded?: () => void;
}
export default function AddSubgroupModal(
  props: Readonly<AddSubgroupModalProps>
) {
  const { rootGroup, onAdded, ...modalProps } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    if (rootGroup) {
      const res = await addSubgroup(name, rootGroup);
      toaster.send(res);
      onAdded?.();
      modalProps.onClose();
    } else {
      console.warn("group to delete is undefined");
    }
  }
  return (
    <Modal {...modalProps} title="New subgroup">
      <Form id="add-subgroup-form" onSubmit={submit}>
        <ModalBody>
          <p>
            Add a subgroup to group <b>{rootGroup.displayName}</b>:
          </p>
          <Field>
            <Label data-required>Subgroup name</Label>
            <Input
              title="Name"
              type="text"
              name="name"
              placeholder="Insert group name..."
              required
            />
            <Description>
              Members of this group will also be member of the parent group.
            </Description>
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
            Add Subgroup
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
