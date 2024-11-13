"use client";
import { Button } from "@/components/Buttons";
import { PencilIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import EditModal from "./EditModal";
import { AUP } from "@/models/aup";

type EditButtonProps = {
  aup: AUP;
};

export default function EditButton(props: Readonly<EditButtonProps>) {
  const { aup } = props;
  const [isShown, setIsShown] = useState(false);
  const show = () => setIsShown(true);
  const hide = () => setIsShown(false);
  return (
    <>
      <EditModal show={isShown} onClose={hide} aup={aup} />
      <Button icon={<PencilIcon />} onClick={show}>
        Edit AUP
      </Button>
    </>
  );
}
