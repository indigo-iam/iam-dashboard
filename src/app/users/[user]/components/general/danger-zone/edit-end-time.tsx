// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
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
import { toast } from "@/components/toaster";
import {
  changeMembershipEndtime,
  revokeMembershipEndtime,
} from "@/services/users";
import { useDisabled } from "@/utils/hooks";

type EditEndtimeModalProps = ModalProps & {
  userId: string;
  userFormattedName: string;
  userEndtime?: string;
};

function EditEndtimeModal(props: Readonly<EditEndtimeModalProps>) {
  const { show, onClose, userId, userFormattedName, userEndtime } = props;
  const [endtime, setEndtime] = useState(userEndtime?.split("T")[0] ?? "");
  const disabled = useDisabled();
  const tooltipId = useId();
  const inputId = useId();
  const minDate = (() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  })();

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const endtime = formData.get("endtime") as string | null;
    const res = endtime
      ? await changeMembershipEndtime(userId, endtime)
      : await revokeMembershipEndtime(userId);
    toast.toast(res);
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
      <ModalHeader onClose={onClose}>Edit user endtime</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <p>
            Edit endtime for user <b>{userFormattedName}</b>. To avoid the user
            is automatically disabled, remove the endtime.
          </p>
          <Field>
            <Label htmlFor={inputId}>Endtime</Label>
            <div className="iam-input flex items-center justify-between">
              <input
                id={inputId}
                className="grow bg-neutral-100 dark:bg-transparent" // hack for safari
                name="endtime"
                type="date"
                value={endtime}
                min={minDate}
                onChange={changeEndtime}
                disabled={disabled}
              />
              <Button
                className="group relative cursor-pointer hover:text-gray-500"
                type="button"
                onClick={clearEndtime}
                aria-labelledby={tooltipId}
              >
                <XCircleIcon className="size-4" />
                <div
                  role="tooltip"
                  className="tooltip whitespace-nowrap"
                  id={tooltipId}
                >
                  Clear
                </div>
              </Button>
            </div>
          </Field>
          <Warning>
            After this date, the user will be automatically disabled and they
            will not be able to access.
          </Warning>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button className="btn-primary" type="submit">
            Save
          </Button>
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
        <div className="flex items-center gap-1">
          <Label>Endtime date</Label>
          <Info className="pb-1" anchor="left">
            After this date user will be automatically disabled.
          </Info>
        </div>
        <div className="flex justify-between gap-4">
          <Input
            defaultValue={userEndtime?.split("T")[0]}
            type="date"
            readOnly
          />
          <Button className="btn-secondary" onClick={open}>
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
