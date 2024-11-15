import ConfirmModal from "@/components/ConfirmModal";
import { Client } from "@/models/client";
import InfoTable from "@/components/InfoTable";
import { deleteClient } from "@/services/clients";

interface DeleteClientModalProps {
  client: Client;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}
export default function DeleteClientModal(
  props: Readonly<DeleteClientModalProps>
) {
  const { client, show, onClose, onDeleted } = props;

  const handleConfirm = async () => {
    await deleteClient(client.client_id);
    onClose();
    onDeleted?.();
  };

  const data = [
    { name: "Name", value: client.client_name },
    { name: "Client ID", value: client.client_id },
  ];

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete Client"
      onConfirm={handleConfirm}
      title="Delete Client"
    >
      Are you sure you want to delete the following client?
      <InfoTable data={data} />
    </ConfirmModal>
  );
}
