"use client";
import { AddButton } from "@/components/Buttons";
import ConfirmModal from "@/components/ConfirmModal";
import { Registration } from "@/models/registration";
import { approveRegistrationRequest } from "@/services/registration";
import { useState } from "react";

type ConfirmButtonProps = {
  request: Registration;
};

export default function ConfirmButton(props: Readonly<ConfirmButtonProps>) {
  const { request } = props;
  const [isModalShown, setIsModalShown] = useState(false);
  const show = () => setIsModalShown(true);
  const hide = () => setIsModalShown(false);

  const action = async () => {
    await approveRegistrationRequest(request.uuid);
    hide();
  };

  return (
    <>
      <AddButton title="Add User" onClick={show} />
      <ConfirmModal
        show={isModalShown}
        onClose={hide}
        onConfirm={action}
        title="Add User"
      >
        <p>
          Are you sure you want to add the user{" "}
          <b>{`${request.givenname} ${request.familyname}`}?</b>
        </p>
        <p className="text-center">
          <i>{`"${request.notes}"`}</i>
        </p>
      </ConfirmModal>
    </>
  );
}
