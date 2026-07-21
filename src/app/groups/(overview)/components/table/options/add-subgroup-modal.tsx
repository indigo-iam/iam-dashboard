// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Description, Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@/components/modal";
import { toast } from "@/components/toaster";
import { addSubgroup } from "@/services/groups";

interface AddSubgroupModalProps extends ModalProps {
  rootGroupId: string;
  rootGroupName: string;
  onAdded?: () => void;
}
export default function AddSubgroupModal(
  props: Readonly<AddSubgroupModalProps>
) {
  const { rootGroupId, rootGroupName, onAdded, ...modalProps } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    const res = await addSubgroup(name, rootGroupId, rootGroupName);
    toast.toast(res);
    onAdded?.();
    modalProps.onClose();
  }

  return (
    <Modal {...modalProps}>
      <ModalHeader onClose={modalProps.onClose}>New subgroup</ModalHeader>
      <Form id="add-subgroup-form" onSubmit={submit}>
        <ModalBody>
          <p>
            Add a subgroup to group <b>{rootGroupName}</b>:
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
