// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/modal";
import { toast } from "@/components/toaster";
import { changeMembershipEndTime } from "@/services/users";
import { useState } from "react";

type EditExpirationDateProps = {
  userId: string;
  userName: string;
  userFormattedName: string;
  userEndTime?: string;
};

export function EditExpirationDate(props: Readonly<EditExpirationDateProps>) {
  const { userId, userName, userFormattedName, userEndTime } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const date = formData.get("end-date") as string;
    const res = await changeMembershipEndTime(userId, date);
    toast.toast(res);
    close();
  }

  const defaultValue = userEndTime?.split("T")[0];

  return (
    <>
      <Button className="btn-secondary" onClick={open}>
        Edit expiration date
      </Button>
      <Modal show={show} onClose={close}>
        <ModalHeader onClose={close}>Edit expiration date</ModalHeader>
        <Form onSubmit={submit}>
          <ModalBody>
            <p className="flex flex-col">
              Change the expiration time for the user
              <span className="text-center font-bold">
                {userFormattedName}
                <span className="font-normal">{` (${userName})`}</span>
              </span>
            </p>
            <Input type="date" name="end-date" defaultValue={defaultValue} />
          </ModalBody>
          <ModalFooter>
            <Button className="btn-tertiary" type="reset" onClick={close}>
              Cancel
            </Button>
            <Button className="btn-primary" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
