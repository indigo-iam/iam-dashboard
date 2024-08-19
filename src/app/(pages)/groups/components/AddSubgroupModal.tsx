import { Button } from "@/components/Buttons";
import { Form } from "@/components/Form";
import Input from "@/components/Input";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { Group } from "@/models/groups";
import { addSubgroup } from "@/services/groups";

interface AddSubgroupModalProps extends ModalProps {
  rootGroup?: Group;
  onSubgroupAdded?: () => void;
}
export default function AddSubgroupModal(
  props: Readonly<AddSubgroupModalProps>
) {
  const { rootGroup, onSubgroupAdded, ...modalProps } = props;
  const action = async (formData: FormData) => {
    const name = formData.get("name") as string;
    if (rootGroup) {
      await addSubgroup(name, rootGroup);
      onSubgroupAdded?.();
      modalProps.onClose();
    } else {
      console.warn("group do delete is undefined");
    }
  };
  return (
    <Modal
      {...modalProps}
      title={`Add new subgroup to '${rootGroup?.displayName}'`}
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
          <Button type="submit">Add Subgroup</Button>
          <Button type="reset" onClick={modalProps.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
