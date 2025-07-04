// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Group } from "@/models/groups";
import { addSubgroup } from "@/services/groups";
import { makeScimReferenceFromGroup } from "@/utils/scim";

interface AddSubgroupModalProps extends ModalProps {
  rootGroup: Group;
  onAdded?: () => void;
}
export default function AddSubgroupModal(
  props: Readonly<AddSubgroupModalProps>
) {
  const { rootGroup, onAdded, ...modalProps } = props;
  const rootGroupRef = makeScimReferenceFromGroup(rootGroup);

  const action = async (formData: FormData) => {
    const name = formData.get("name") as string;
    if (rootGroup) {
      await addSubgroup(name, rootGroupRef);
      onAdded?.();
      modalProps.onClose();
    } else {
      console.warn("group to delete is undefined");
    }
  };
  return (
    <Modal
      {...modalProps}
      title={`Add new subgroup to '${rootGroupRef.display}'`}
    >
      <Form id="add-subgroup-form" action={action}>
        <ModalBody>
          <Input
            title="Name"
            type="text"
            name="name"
            placeholder="Insert group name..."
            required
          />
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
