// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@/components/modal";
import { Input } from "@/components/inputs";
import { Textarea } from "@/components/textarea";
import { useProgressBar } from "@/components/progress-bar";
import { addProxyCert } from "@/services/certs";
import { toast } from "@/components/toaster";

type LinkProxyModalProps = ModalProps & {
  userId: string;
  userName: string;
  disabled: boolean;
};

function LinkProxyModal(props: Readonly<LinkProxyModalProps>) {
  const { show, onClose, userId, userName, disabled } = props;
  const [error, setError] = useState<string | null>(null);
  const { startTransition } = useProgressBar();
  if (disabled) {
    return (
      <Modal show={show} onClose={onClose}>
        <ModalHeader onClose={onClose}>Link proxy certificate</ModalHeader>
        <ModalBody>
          <div className="flex w-full flex-row justify-center">
            <InformationCircleIcon className="size-12" />
          </div>
          <p className="text-center">
            This account has no linked X.509 certificate to be associated to a
            proxy certificate. Please add a personal certificate to your Indigo
            IAM account or contact your administrator for help.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" onClick={onClose}>
            Cancel
          </Button>
          <Button className="btn-secondary" disabled={disabled}>
            Link proxy certificate
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const proxy = formData.get("proxy-cert") as string;
    startTransition(async () => {
      const res = await addProxyCert(userId, proxy);
      if (res?.type === "error") {
        toast.error("Failed to link certificate", res.title);
        setError(res.title);
      } else {
        toast.success("Proxy certificate successfully linked");
        onClose();
        setError(null);
      }
    });
  }

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader onClose={onClose}>Link proxy certificate</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label>User</Label>
            <Input defaultValue={userName} disabled />
          </Field>
          <Field>
            <Label data-required>Proxy certificate</Label>
            <Textarea
              name="proxy-cert"
              className="iam-input w-full"
              placeholder="Private key/public cert PEM here..."
              required
              rows={8}
            />
          </Field>
          {error && <p className="text-danger">{error}</p>}
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" onClick={onClose}>
            Cancel
          </Button>
          <Button className="btn-secondary" type="submit">
            Link proxy certificate
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

type LinkProxyButtonProps = {
  userId: string;
  userName: string;
  disabled: boolean;
};

export function LinkProxyButton(props: Readonly<LinkProxyButtonProps>) {
  const { userId, userName, disabled } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button onClick={open} className="btn-secondary">
        Link proxy certificate
      </Button>
      <LinkProxyModal
        show={show}
        onClose={close}
        userId={userId}
        userName={userName}
        disabled={disabled}
      />
    </>
  );
}
