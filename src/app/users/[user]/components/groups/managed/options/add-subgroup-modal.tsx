// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { toast } from "@/components/toaster";
import { ManagedGroup } from "@/models/groups";
import { addSubgroupToManagedGroup } from "@/services/groups";

interface AddSubgroupModalProps extends ModalProps {
  rootGroup: ManagedGroup;
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
      const res = await addSubgroupToManagedGroup(name, rootGroup);
      toast.toast(res);
      onAdded?.();
      modalProps.onClose();
    } else {
      console.warn("group to delete is undefined");
    }
  }

  return (
    <Modal {...modalProps}>
      <ModalHeader
        onClose={modalProps.onClose}
      >{`Add new subgroup to '${rootGroup.name}'`}</ModalHeader>
      <Form id="add-subgroup-form" onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label data-required>Group Name</Label>
            <Input
              title="Name"
              type="text"
              name="name"
              placeholder="Insert group name..."
              required
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
            Add Subgroup
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
