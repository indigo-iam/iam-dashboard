// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { User } from "@/models/scim";
import { changeMembershipEndTime } from "@/services/users";
import { useState } from "react";

type EditExpirationDateProps = {
  user: User;
};

export function EditExpirationDate(props: Readonly<EditExpirationDateProps>) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const action = (formData: FormData) => {
    const date = formData.get("end-date") as string;
    changeMembershipEndTime(user.id, date);
    close();
  };
  const defaultValue =
    user["urn:indigo-dc:scim:schemas:IndigoUser"]?.endTime?.split("T")[0];
  return (
    <>
      <Button className="btn-secondary" onClick={open}>
        Edit expiration date
      </Button>
      <Modal show={show} onClose={close} title="Edit expiration date">
        <Form action={action}>
          <ModalBody>
            <p className="flex flex-col">
              Change the expiration time for the user
              <span className="text-center font-bold">
                {user.name?.formatted}
                <span className="font-normal">{` (${user.userName})`}</span>
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
