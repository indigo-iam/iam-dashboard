// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SearchUsers } from "@/app/components/search-users";
import { Button } from "@/components/buttons";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/modal";
import { User } from "@/models/scim";
import { addOwner } from "@/services/clients";
import { useState } from "react";

type AddOwnerModalProps = {
  clientId: string;
  clientName: string;
  show: boolean;
  onClose: () => void;
};

export function AddOwnerModal(props: Readonly<AddOwnerModalProps>) {
  const { clientId, clientName, ...modalProps } = props;
  const [user, setUser] = useState<User>();
  const clear = () => setUser(undefined);
  const action = async () => {
    if (user) {
      await addOwner(clientId, user.id);
    }
    modalProps.onClose();
  };
  return (
    <Modal {...modalProps}>
      <ModalHeader onClose={modalProps.onClose}>Add client owner</ModalHeader>
      <ModalBody>
        {user ? (
          <p className="py-2">
            Do you want to make the user{" "}
            <span className="font-medium">
              {user.name?.familyName ?? "unknown user"}
            </span>{" "}
            ({user.emails?.[0].value ?? "unknown email"}) owner of group{" "}
            <span className="font-medium">{clientName}</span>?
          </p>
        ) : (
          <div>
            <p className="py-2">
              Type to search for a user to be owner of client{" "}
              <span className="font-medium">{clientName}</span>
            </p>
            <SearchUsers listId="search-list-owner" onSelect={setUser} />
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
