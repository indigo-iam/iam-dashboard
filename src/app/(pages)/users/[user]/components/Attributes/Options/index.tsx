"use client";
import { Attribute } from "@/models/attributes";
import { User } from "@/models/scim";
import DeleteAttributeConfirmModal from "./DeleteModal";
import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

type OptionsProps = {
  user: User;
  attr: Attribute;
};

export default function Options(props: Readonly<OptionsProps>) {
  const { user, attr } = props;
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Popover>
        <PopoverButton>
          <EllipsisHorizontalIcon className="size-8" />
        </PopoverButton>
        <PopoverPanel
          anchor="bottom end"
          className="rounded-lg bg-secondary shadow dark:bg-secondary/10"
        >
          <button
            className="popover-option text-danger"
            type="button"
            onClick={showModal}
          >
            Delete
          </button>
        </PopoverPanel>
      </Popover>
      <DeleteAttributeConfirmModal
        user={user}
        attr={attr}
        show={show}
        onClose={closeModal}
      />
    </>
  );
}
