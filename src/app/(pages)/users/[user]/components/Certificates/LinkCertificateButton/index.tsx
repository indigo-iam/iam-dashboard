"use client";
import { Button } from "@/components/Buttons";
import { User } from "@/models/scim";
import { useState } from "react";
import LinkCertificateModal from "./Modal";

type LinkButtonProps = {
  user: User;
};

export default function LinkCertificateButton(
  props: Readonly<LinkButtonProps>
) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button action="primary-outline" onClick={open}>
        Request certificate linking
      </Button>
      <LinkCertificateModal show={show} onClose={close} user={user} />
    </>
  );
}
