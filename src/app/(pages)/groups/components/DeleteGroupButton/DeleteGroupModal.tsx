import { Button } from "@/components/Buttons";
import { Form } from "@/components/Form";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { ScimReference } from "@/models/scim";
import { deleteGroup } from "@/services/groups";

interface DeleteGroupModalProps extends ModalProps {
  group: ScimReference;
  onDeleted?: () => void;
}
export default function DeleteGroupModal(
  props: Readonly<DeleteGroupModalProps>
) {
  const { group, onDeleted, ...modalProps } = props;
  const action = async (_: FormData) => {
    if (group) {
      await deleteGroup(group?.value);
      onDeleted?.();
      modalProps.onClose();
    } else {
      console.warn("group to delete is undefined");
    }
  };
  return (
    <Modal {...modalProps} title="Delete group">
      <Form id="delete-group-form" action={action}>
        <ModalBody>
          <p className="py-2">
            Are you sure you want to delete group <b>{`${group?.display}`}</b>?
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
