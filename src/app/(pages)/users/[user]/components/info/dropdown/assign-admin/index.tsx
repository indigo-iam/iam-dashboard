import ConfirmModal from "@/components/confirm-modal";
import { ModalProps } from "@/components/modal";
import { User } from "@/models/scim";
import {
  assignAdminPrivileges,
  revokeAdminPrivileges,
} from "@/services/authorities";

interface AssignAdminModalProps extends ModalProps {
  user: User;
}

export function AssignAdminModal(props: Readonly<AssignAdminModalProps>) {
  const { user } = props;
  const indigoUser = user["urn:indigo-dc:scim:schemas:IndigoUser"];
  const isAdmin = indigoUser?.authorities?.includes("ROLE_ADMIN");
  const title = `${isAdmin ? "Revoke" : "Assign"} Admin Privileges`;

  const action = async () => {
    const operation = isAdmin ? revokeAdminPrivileges : assignAdminPrivileges;
    await operation(user.id);
    props.onClose();
  };

  return (
    <ConfirmModal
      {...props}
      title={title}
      onConfirm={action}
      onCancel={props.onClose}
    >
      Do you want to want to {isAdmin ? "revoke" : "assign"} admin privileges to
      user <b>{user.displayName}</b>?
    </ConfirmModal>
  );
}
