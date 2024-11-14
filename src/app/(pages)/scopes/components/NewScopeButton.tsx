"use client";

import { useState } from "react";
import NewScopeModal from "./NewScopeModal";
import { Button } from "@/components/Buttons";
import { PlusIcon } from "@heroicons/react/16/solid";

export default function NewScopeButton() {
  const [isShown, setIsShown] = useState(false);
  const show = () => setIsShown(true);
  const hide = () => setIsShown(false);

  return (
    <>
      <NewScopeModal show={isShown} onClose={hide} />
      <Button action="primary-outline" icon={<PlusIcon />} onClick={show}>
        New Scope
      </Button>
    </>
  );
}
