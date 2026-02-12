// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { User } from "@/models/scim";
import { deleteUser } from "@/services/users";

type RowProps = {
  title: string;
  value?: string;
};

function Row(props: Readonly<RowProps>) {
  const { title, value } = props;
  return (
    <tr>
      <td className="px-2">
        <b>{title}</b>
      </td>
      <td>{value}</td>
    </tr>
  );
}

interface DeleteUserModalProps extends ModalProps {
  user?: User;
  onUserDeleted?: () => void;
}

export default function DeleteUserModal(props: Readonly<DeleteUserModalProps>) {
  const { user, onUserDeleted, ...modalProps } = props;

  const action = async () => {
    if (user) {
      deleteUser(user);
      onUserDeleted?.();
      modalProps.onClose();
    }
  };

  const createdAt = user?.meta?.created
    ? new Date(user?.meta.created).toLocaleDateString()
    : "N/A";

  const groups = user?.groups
    ? user?.groups.map(g => g.display).join(" ")
    : "No groups";

  return (
    <Modal {...modalProps} title={`Delete user '${user?.name?.formatted}'`}>
      <Form id="delete-user-form">
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
          <Button
            className="btn-tertiary"
            type="button"
            onClick={modalProps.onClose}
          >
            Cancel
          </Button>
          <Button className="btn-danger" type="button" onClick={action}>
            Delete user
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
