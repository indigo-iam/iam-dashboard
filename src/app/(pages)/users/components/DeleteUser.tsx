import { Button } from "@/components/Buttons";
import { Form } from "@/components/Form";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { User } from "@/models/scim";
import { deleteUser } from "@/services/users";

interface DeleteUserProps extends ModalProps {
  user?: User;
  onUserDeleted?: () => void;
}

export default function DeleteUser(props: Readonly<DeleteUserProps>) {
  const { user, onUserDeleted, ...modalProps } = props;

  const action = async () => {
    if (user) {
      deleteUser(user);
      onUserDeleted?.();
      modalProps.onClose();
    }
  };

  const Row = (props: Readonly<{ title: string; value?: string }>) => {
    const { title, value } = props;
    return (
      <tr>
        <td className="px-2">
          <b>{title}</b>
        </td>
        <td>{value}</td>
      </tr>
    );
  };

  const createdAt = user?.meta?.created
    ? new Date(user?.meta.created).toLocaleDateString()
    : "N/A";

  const groups = user?.groups
    ? user?.groups.map(g => g.display).join(" ")
    : "No groups";

  return (
    <Form id="delete-user-form">
      <Modal {...modalProps} title={`Delete user '${user?.name?.formatted}'`}>
        <ModalBody>
          <p className="py-2">The following user will be deleted:</p>
          <table className="table-auto">
            <tbody>
              <Row title="Name" value={user?.name?.formatted} />
              <Row title="Username" value={user?.userName} />
              <Row title="User ID" value={user?.id} />
              <Row title="E-mail" value={user?.emails?.[0].value} />
              <Row title="Created at" value={createdAt} />
              <Row title="Groups" value={groups} />
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <Button action="danger" type="button" onClick={action}>
            Delete User
          </Button>
          <Button type="button" onClick={modalProps.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Form>
  );
}
