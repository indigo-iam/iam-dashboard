// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SearchUsers } from "@/app/components/search-users";
import { Button } from "@/components/buttons";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/modal";
import { Notice } from "@/components/notices";
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
          <div className="space-y-4">
            <p>
              Do you want to make the following user owner of the client{" "}
              <b>{clientName}</b>?
            </p>
            <Notice>
              <p>
                <b>{user.name?.formatted}</b>
              </p>
              <p className="text-sm">{user.emails?.[0].value}</p>
            </Notice>
          </div>
        ) : (
          <div>
            <p className="py-2">
              Type to search for a user to be owner of client{" "}
              <b>{clientName}</b>
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
