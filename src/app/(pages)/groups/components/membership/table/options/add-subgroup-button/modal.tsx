import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Group } from "@/models/groups";
import { addSubgroup } from "@/services/groups";

interface AddSubgroupModalProps extends ModalProps {
  rootGroup?: Group;
  onAdded?: () => void;
}
export default function AddSubgroupModal(
  props: Readonly<AddSubgroupModalProps>
) {
  const { rootGroup, onAdded, ...modalProps } = props;
  const action = async (formData: FormData) => {
    const name = formData.get("name") as string;
    if (rootGroup) {
      await addSubgroup(name, rootGroup);
      onAdded?.();
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
