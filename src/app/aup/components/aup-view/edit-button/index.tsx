// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Button } from "@/components/buttons";
import { PencilIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import EditModal from "./edit-modal";
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
      <Button className="btn-secondary" onClick={show}>
        <PencilIcon className="my-auto size-5" />
        Edit AUP
      </Button>
    </>
  );
}
