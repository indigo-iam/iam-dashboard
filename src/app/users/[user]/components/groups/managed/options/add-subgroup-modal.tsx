// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { ManagedGroup } from "@/models/groups";
import { addSubgroup, addSubgroupToManagedGroup } from "@/services/groups";

interface AddSubgroupModalProps extends ModalProps {
  rootGroup: ManagedGroup;
  onAdded?: () => void;
}
export default function AddSubgroupModal(
  props: Readonly<AddSubgroupModalProps>
) {
  const { rootGroup, onAdded, ...modalProps } = props;
  const action = async (formData: FormData) => {
    const name = formData.get("name") as string;
    if (rootGroup) {
      await addSubgroupToManagedGroup(name, rootGroup);
      onAdded?.();
      modalProps.onClose();
    } else {
      console.warn("group to delete is undefined");
    }
  };
  return (
    <Modal
      {...modalProps}
      title={`Add new subgroup to '${rootGroup.name}'`}
    >
      <Form id="add-subgroup-form" action={action}>
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
