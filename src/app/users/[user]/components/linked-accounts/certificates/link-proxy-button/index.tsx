// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Field } from "@/components/field";
import { Label } from "@/components/label";
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
import { useToaster } from "@/components/toaster";

type LinkProxyModalProps = ModalProps & {
  userId: string;
  userName: string;
};

function LinkProxyModal(props: Readonly<LinkProxyModalProps>) {
  const { show, onClose, userId, userName } = props;
  const [error, setError] = useState<string | null>(null);
  const { startTransition } = useProgressBar();
  const toast = useToaster();

  function close() {
    setError(null);
    onClose();
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
    <Modal show={show} onClose={close}>
      <ModalHeader>Link proxy certificate</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label>User</Label>
            <Input defaultValue={userName} disabled />
          </Field>
          <Field>
            <Label>Proxy certificate</Label>
            <Textarea
              name="proxy-cert"
              placeholder="Private key/public cert PEM here..."
              required
              rows={8}
            />
          </Field>
          {error && <p className="text-danger">{error}</p>}
        </ModalBody>
        <ModalFooter>
          <Button variant="underline" type="reset" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">Confirm</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

type LinkProxyButtonProps = {
  userId: string;
  userName: string;
};

export function LinkProxyButton(props: Readonly<LinkProxyButtonProps>) {
  const { userId, userName } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button variant="outline" type="button" onClick={open}>
        Link proxy certificate
      </Button>
      <LinkProxyModal
        show={show}
        onClose={close}
        userId={userId}
        userName={userName}
      />
    </>
  );
}
