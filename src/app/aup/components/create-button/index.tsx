// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";

import { Button } from "@/components/buttons";
import AupModal from "../modal";

export default function CreateButton() {
  const [isShown, setIsShown] = useState(false);
  const show = () => setIsShown(true);
  const hide = () => setIsShown(false);
  return (
    <>
      <AupModal show={isShown} onClose={hide} />
      <Button variant="outline" type="button" onClick={show}>
        <PlusIcon className="my-auto size-5" />
        Create AUP
      </Button>
    </>
  );
}
