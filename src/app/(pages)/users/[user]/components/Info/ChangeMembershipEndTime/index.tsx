import ConfirmModal from "@/components/ConfirmModal";
import { ModalProps } from "@/components/Modal";

interface ChangeMembershipEndTimeModalProps extends ModalProps {}

export function ChangeMembershipEndTimeModal(
  props: ChangeMembershipEndTimeModalProps
) {
  return <ConfirmModal {...props} title="Change Membership End Time" />;
}
