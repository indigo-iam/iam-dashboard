import { Button } from "@/components/Buttons";
import { Form } from "@/components/Form";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { Group } from "@/models/groups";
import { deleteRootGroup } from "@/services/groups";

interface DeleteRootGroupProps extends ModalProps {
  group?: Group;
  onDeleted?: () => void;
}
export default function DeleteRootGroup(props: Readonly<DeleteRootGroupProps>) {
  const { group, onDeleted, ...modalProps } = props;
  const action = async (_: FormData) => {
    if (group) {
      await deleteRootGroup(group?.id);
      onDeleted?.();
      modalProps.onClose();
    } else {
      console.warn("group to delete is undefined");
    }
  };
  return (
    <Modal {...modalProps} title="Delete group">
      <Form id="delete-root-group-form" action={action}>
        <ModalBody>
          <p className="py-2">
            Are you sure you want to delete group {`${group?.displayName}`}?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button action="danger" type="submit">
            Delete Group
          </Button>
          <Button type="button" onClick={modalProps.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
