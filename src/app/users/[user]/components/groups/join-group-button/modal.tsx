// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { SearchGroups } from "@/app/components/search-groups";
import { Form, Field, Label } from "@/components/form";
import { Button } from "@/components/buttons";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Textarea } from "@/components/textarea";
import { JoinGroupRequest } from "@/models/group-requests";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { submitGroupRequest } from "@/services/group-requests";
import { addUserToGroup } from "@/services/groups";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
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
      await addUserToGroup(selected.id, user);
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

  return (
    <Modal {...modalProps} onClose={clearAndClose}>
      <Form action={action}>
        <ModalBody>
          <div hidden={!!selected}>
            <Field>
              <Label>Select a Group to join</Label>
              <SearchGroups onSelect={selectGroup} />
            </Field>
          </div>
          <div className="space-y-4" hidden={!selected}>
            <p>
              Do you want to join group<b> {selected?.displayName}</b>?
            </p>
            <ul className="flex flex-col">
              <li className="inline-flex gap-1">
                <span className="font-bold">Name:</span>
                <span>{selected?.displayName}</span>
              </li>
              <li className="inline-flex gap-1">
                <span className="font-bold">Group ID:</span>
                <span>{selected?.id}</span>
              </li>
              <li className="inline-flex gap-1">
                <span className="font-bold">Labels:</span>
                <span>{labels}</span>
              </li>
            </ul>
          </div>
          {!isAdmin ? (
            <section className="flex flex-col gap-2">
              <h4> Provide a motivation for your request</h4>
              <p>
                This motivation will be show to the administrators that will
                manage your request.
              </p>
              <Textarea
                id="group-request-notes"
                name="group-request-notes"
                placeholder="Explain why you want to be a member of group..."
                className="iam-input w-full"
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
