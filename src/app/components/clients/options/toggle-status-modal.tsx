// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Field, Label } from "@/components/form";
import { Form } from "@/components/form/form";
import { Input } from "@/components/inputs";
import { Client } from "@/models/client";
import { disableClient, enableClient } from "@/services/clients";

type ToggleStatusModalProps = {
  client: Client;
  show: boolean;
  onClose: () => void;
};

export default function ToggleStatusModal(
  props: Readonly<ToggleStatusModalProps>
) {
  const { client, show, onClose } = props;
  const { client_name, client_id, active } = client;
  const title = `${active ? "Disable" : "Enable"} client ${client_name}`;

  const handleConfirm = async () => {
    active ? await disableClient(client) : await enableClient(client);
    onClose();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText={`${active ? "Disable" : "Enable"} Client`}
      onConfirm={handleConfirm}
      title={title}
      danger={active}
    >
      <p>
        Are you sure you want to {active ? "disable" : "enable"} the following
        client?
      </p>
      <Field>
        <Label>Client name</Label>
        <Input defaultValue={client_name} disabled />
      </Field>
      <Field>
        <Label>Client id</Label>
        <Input defaultValue={client_id} disabled />
      </Field>
    </ConfirmModal>
  );
}
