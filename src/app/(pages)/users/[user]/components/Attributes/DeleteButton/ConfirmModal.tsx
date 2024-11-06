import ConfirmModal from "@/components/ConfirmModal";
import InfoTable from "@/components/InfoTable";
import { Attribute } from "@/models/attributes";
import { ScimUser } from "@/models/scim";
import { deleteAttribute } from "@/services/users";

type DeleteAttributeConfirmModalProps = {
  user: ScimUser;
  attr: Attribute;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
};

export default function DeleteAttributeConfirmModal(
  props: Readonly<DeleteAttributeConfirmModalProps>
) {
  const { user, attr, show, onClose, onDeleted } = props;

  const confirm = async () => {
    await deleteAttribute(user.id, attr);
    onClose();
    onDeleted?.();
  };

  const data = [
    { name: "Attribute Name", value: attr.name },
    { name: "Attribute Value", value: attr.value },
  ];

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete Attribute"
      title="Delete Attribute"
      onConfirm={confirm}
    >
      <p>
        The following attribute will be removed from{" "}
        <b>{user.name?.formatted}</b> account:
      </p>
      <InfoTable data={data} />
    </ConfirmModal>
  );
}
