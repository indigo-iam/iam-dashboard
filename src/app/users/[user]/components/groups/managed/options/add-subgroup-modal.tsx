// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Field } from "@/components/field";
import { Label } from "@/components/label";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@/components/modal";
import { useToaster } from "@/components/toaster";
import { addSubgroup } from "@/services/groups";

interface AddSubgroupModalProps extends ModalProps {
  rootGroupId: string;
  rootGroupDisplayName: string;
  onAdded?: () => void;
}
export default function AddSubgroupModal(
  props: Readonly<AddSubgroupModalProps>
) {
  const { rootGroupId, rootGroupDisplayName, onAdded, ...modalProps } = props;
  const { toast } = useToaster();

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const res = await addSubgroup(name, rootGroupId, rootGroupDisplayName);
    toast(res);
    onAdded?.();
    modalProps.onClose();
  }

  return (
    <Modal {...modalProps}>
      <ModalHeader>{`Add new subgroup to '${rootGroupDisplayName}'`}</ModalHeader>
      <Form id="add-subgroup-form" onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label>Group Name</Label>
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
          <Button variant="underline" type="reset" onClick={modalProps.onClose}>
            Cancel
          </Button>
          <Button type="submit">Add subgroup</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
