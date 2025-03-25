import ConfirmModal from "@/components/confirm-modal";
import { OidcId } from "@/models/indigo-user";

type ConfirmUnlinkAccountModalProps = {
  oidcId: OidcId;
  show: boolean;
  onClose: () => void;
};

export default function ConfirmUnlinkAccountModal(
  props: Readonly<ConfirmUnlinkAccountModalProps>
) {
  const { oidcId, show, onClose } = props;

  const handleConfirm = async () => {
    // TODO: implement action
    console.log("Unlink account!");
    onClose();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Remove Membership"
      title="Remove User Membership"
      onConfirm={handleConfirm}
    >
      Are you sure you want to unlink the account with subject{" "}
      <b>{oidcId.subject}</b> and issuer
      <b>{oidcId.issuer}</b>?
    </ConfirmModal>
  );
}
