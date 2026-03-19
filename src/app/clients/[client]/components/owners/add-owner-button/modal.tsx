// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SearchUsers } from "@/app/components/search-users";
import { Button } from "@/components/buttons";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { Client } from "@/models/client";
import { User } from "@/models/scim";
import { addOwner } from "@/services/clients";
import { useState } from "react";

type AddOwnerModalProps = {
  client: Client;
  show: boolean;
  onClose: () => void;
};

export function AddOwnerModal(props: Readonly<AddOwnerModalProps>) {
  const { client, ...modalProps } = props;
  const [user, setUser] = useState<User>();
  const clear = () => setUser(undefined);
  const action = async () => {
    if (user) {
      await addOwner(client, user);
    }
    modalProps.onClose();
  };
  return (
    <Modal {...modalProps} title="Add client owner">
      <ModalBody>
        {user ? (
          <p className="py-2">
            Do you want to make the user{" "}
            <span className="font-medium">
              {user.name?.familyName ?? "unknown user"}
            </span>{" "}
            ({user.emails?.[0].value ?? "unknown email"}) owner of group{" "}
            <span className="font-medium">{client.client_name}</span>?
          </p>
        ) : (
          <div>
            <p className="py-2">
              Type to search for a user to be owner of client{" "}
              <span className="font-medium">{client.client_name}</span>
            </p>
            <SearchUsers onSelect={setUser} />
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button className="btn-tertiary" type="button" onClick={clear}>
          Cancel
        </Button>
        <Button
          className="btn-primary"
          type="button"
          disabled={!user}
          onClick={action}
        >
          Add owner
        </Button>
      </ModalFooter>
    </Modal>
  );
}
