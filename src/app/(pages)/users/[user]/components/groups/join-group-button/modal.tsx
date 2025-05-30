// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Form, Field, Label } from "@/components/form";
import { Button } from "@/components/buttons";
import { JoinGroupRequest } from "@/models/group-requests";
import { submitGroupRequest } from "@/services/group-requests";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { addUserToGroup, searchGroup } from "@/services/groups";
import Combobox from "@/components/combobox";
import TextArea from "@/components/textarea";
import InfoTable from "@/components/info-table";
import { makeScimReferenceFromUser } from "@/utils/scim";
import { useState } from "react";

export interface JoinGroupModalProps extends ModalProps {
  user: User;
  groups: Group[];
  isAdmin?: boolean;
}

export const JoinGroupModal = (props: JoinGroupModalProps) => {
  let { user, groups, onClose, isAdmin, ...modalProps } = props;
  const [selected, setSelected] = useState<Group>();

  const selectGroup = (group: Group) => {
    setSelected(group);
  };

  const labels = (() => {
    const indigoGroup = selected?.["urn:indigo-dc:scim:schemas:IndigoGroup"];
    if (indigoGroup?.labels) {
      return indigoGroup.labels.map(l => l.name).join(" ");
    }
    return "";
  })();

  const clearAndClose = () => {
    onClose();
    setTimeout(() => setSelected(undefined), 500);
  };

  const action = async (formData: FormData) => {
    if (isAdmin && selected) {
      const userRef = makeScimReferenceFromUser(user);
      await addUserToGroup(selected.id, userRef);
    } else {
      const req: JoinGroupRequest = {
        notes: formData.get("group-request-notes") as string,
        username: user.userName!,
        groupName: selected!.displayName,
      };
      await submitGroupRequest(req);
    }
    clearAndClose();
  };

  const data = [
    { name: "Name", value: selected?.displayName },
    { name: "Group ID", value: selected?.id },
    { name: "Labels", value: labels },
  ];

  return (
    <Modal {...modalProps} onClose={clearAndClose}>
      <Form action={action}>
        <ModalBody>
          <div hidden={!!selected}>
            <Field>
              <Label>Select a Group to join</Label>
              <Combobox onSelected={selectGroup} searchCallback={searchGroup} />
            </Field>
          </div>
          <div className="space-y-4" hidden={!selected}>
            <p>
              Do you want to join group<b> {selected?.displayName}</b>?
            </p>
            <InfoTable data={data} />
          </div>
          {!isAdmin ? (
            <section className="flex flex-col gap-2">
              <h4> Provide a motivation for your request</h4>
              <p>
                This motivation will be show to the administrators that will
                manage your request.
              </p>
              <TextArea
                id="group-request-notes"
                name="group-request-notes"
                placeholder="Explain why you want to be a member of group..."
                className="textarea w-full"
                required={!isAdmin}
              />
            </section>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-tertiary"
            type="button"
            onClick={clearAndClose}
          >
            Cancel
          </Button>
          <Button className="btn-primary" type="submit">
            <ArrowUpTrayIcon className="my-auto size-5" />
            Add group
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
