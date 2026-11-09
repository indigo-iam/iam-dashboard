// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId, useRef, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Field } from "@/components/field";
import { Label } from "@/components/label";
import { Info } from "@/components/info";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@/components/modal";
import { Warning } from "@/components/notices";
import { useToaster } from "@/components/toaster";
import { changeMembershipEndtime } from "@/services/users";
import { useDisabled } from "@/utils/hooks";

type EditEndtimeModalProps = ModalProps & {
  userId: string;
  userFormattedName: string;
  userEndtime?: string;
};

function EditEndtimeModal(props: Readonly<EditEndtimeModalProps>) {
  const { show, onClose, userId, userFormattedName, userEndtime } = props;
  const [endtime, setEndtime] = useState(userEndtime?.split("T")[0] ?? "");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const disabled = useDisabled();
  const inputId = useId();
  const { toast } = useToaster();

  const minDate = (() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  })();

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const endtime = formData.get("endtime") as string | null;
    const res = await changeMembershipEndtime(userId, endtime);
    toast(res);
    if (res.type === "success") {
      onClose();
    }
  }

  function changeEndtime(event: React.ChangeEvent<HTMLInputElement>) {
    setEndtime(event.currentTarget.value);
  }

  function clearEndtime() {
    setEndtime("");
  }

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Edit user endtime</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <p>
            Edit endtime for user <b>{userFormattedName}</b>. To avoid the user
            is automatically disabled, remove the endtime.
          </p>
          <Field>
            <Label htmlFor={inputId}>Endtime</Label>
            <div className="iam-input flex items-center justify-between gap-2">
              <Input
                id={inputId}
                name="endtime"
                type="date"
                value={endtime}
                min={minDate}
                onChange={changeEndtime}
                disabled={disabled}
              />
              <Button
                name="Clear"
                variant="plain"
                className="group relative cursor-pointer text-neutral-400 hover:text-neutral-500 dark:text-gray-400 dark:hover:text-gray-300"
                type="button"
                onClick={clearEndtime}
                ref={buttonRef}
                disabled={disabled}
              >
                <XCircleIcon className="size-5" />
              </Button>
            </div>
          </Field>
          <Warning>
            After this date, the user will be automatically disabled and they
            will not be able to access.
          </Warning>
        </ModalBody>
        <ModalFooter>
          <Button variant="underline" type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

type EditEndtimeProps = {
  userId: string;
  userFormattedName: string;
  userEndtime?: string;
};

export function EditEndtime(props: Readonly<EditEndtimeProps>) {
  const { userId, userFormattedName, userEndtime } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Field>
        <Label>
          <div className="flex items-center gap-1">
            <span>Endtime date</span>
            <Info>After this date user will be automatically disabled.</Info>
          </div>
        </Label>
        <div className="flex justify-between gap-4">
          <Input
            defaultValue={userEndtime?.split("T")[0]}
            type="date"
            readOnly
          />
          <Button variant="outline" type="button" onClick={open}>
            Edit
          </Button>
        </div>
      </Field>
      <EditEndtimeModal
        show={show}
        onClose={close}
        userId={userId}
        userFormattedName={userFormattedName}
        userEndtime={userEndtime}
      />
    </>
  );
}
