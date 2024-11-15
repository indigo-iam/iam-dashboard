import { useState } from "react";
import ConfirmUnlinkUserModal from "./ConfirmModal";
import { ScimReference } from "@/models/scim";

export type RemoveMembershipProps = {
  userRef: ScimReference;
  groupId: string;
  groupName: string;
};

export default function RemoveMembership(
  props: Readonly<RemoveMembershipProps>
) {
  const { userRef, groupId, groupName } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <button
        type="button"
        title="Remove Membership"
        className="popover-option text-danger"
        onClick={showModal}
      >
        Remove Membership
      </button>
      <ConfirmUnlinkUserModal
        userRef={userRef}
        groupId={groupId}
        groupName={groupName}
        show={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
