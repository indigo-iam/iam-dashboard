"use client";
import ConfirmModal from "@/components/ConfirmModal";
import { Registration } from "@/models/registration";
import { approveRegistrationRequest } from "@/services/registration";
import { useState } from "react";

type ConfirmButtonProps = {
  request: Registration;
};

export default function ConfirmButton(props: Readonly<ConfirmButtonProps>) {
  const { request } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  const action = async () => {
    await approveRegistrationRequest(request.uuid);
    close();
  };

  return (
    <>
      <button
        type="button"
        className="popover-option"
        onClick={open}
      >
        Accept User
      </button>
      <ConfirmModal
        show={show}
        onClose={close}
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
