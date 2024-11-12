"use client";
import ConfirmModal from "@/components/ConfirmModal";
import { Scope } from "@/models/client";
import { deleteScope } from "@/services/scopes";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteButtonProps = {
  scope: Scope;
};

export default function DeleteButton(props: Readonly<DeleteButtonProps>) {
  const { scope } = props;
  const [isShown, setIsShown] = useState(false);
  const router = useRouter();
  const show = () => setIsShown(true);
  const hide = () => setIsShown(false);
  const action = async () => {
    await deleteScope(scope);
    hide();
    router.replace("/scopes");
  };
  return (
    <>
      <ConfirmModal
        show={isShown}
        onClose={hide}
        title="Delete Scope"
        onConfirm={action}
      >
        <p>
          Are you sure you want to delete the scope <b>{scope.value}</b>?
        </p>
      </ConfirmModal>
      <button className="btn-delete" onClick={show}>
        <XMarkIcon />
      </button>
    </>
  );
}
