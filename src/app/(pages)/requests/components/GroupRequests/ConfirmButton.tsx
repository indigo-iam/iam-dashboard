"use client";
import { AddButton } from "@/components/Buttons";
import ConfirmModal from "@/components/ConfirmModal";
import { GroupRequest } from "@/models/group-requests";
import { approveGroupRequest } from "@/services/group-requests";
import { useState } from "react";

type ConfirmButtonProps = {
  request: GroupRequest;
};

export default function ConfirmButton(props: Readonly<ConfirmButtonProps>) {
  const { request } = props;
  const [isModalShown, setIsModalShown] = useState(false);
  const show = () => setIsModalShown(true);
  const hide = () => setIsModalShown(false);

  const action = async () => {
    await approveGroupRequest(request.uuid);
    hide();
  };

  return (
    <>
      <AddButton title="Approve Group Request" onClick={show} />
      <ConfirmModal
        show={isModalShown}
        onClose={hide}
        onConfirm={action}
        title="Approve Group Request"
      >
        <p>
          Are you sure you want the user <b>{request.userFullName}</b> to join
          the group <b>{request.groupName}</b>?
        </p>
        <p className="text-center">
          <i>{`"${request.notes}"`}</i>
        </p>
      </ConfirmModal>
    </>
  );
}
