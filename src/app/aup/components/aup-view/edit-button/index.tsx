// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { PencilIcon } from "@heroicons/react/16/solid";

import { Button } from "@/components/buttons";
import { AUP } from "@/models/aup";
import AupModal from "@/app/aup/components/modal";

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
      <AupModal show={isShown} onClose={hide} aup={aup} />
      <Button variant="outline" type="button" onClick={show}>
        <PencilIcon className="size-4" />
        Edit AUP
      </Button>
    </>
  );
}
