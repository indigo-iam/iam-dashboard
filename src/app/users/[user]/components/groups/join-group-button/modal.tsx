// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { SearchGroups } from "@/app/components/search-groups";
import { Form, Field, Label, Description } from "@/components/form";
import { Button } from "@/components/buttons";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Textarea } from "@/components/textarea";
import { JoinGroupRequest } from "@/models/group-requests";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { submitGroupRequest } from "@/services/group-requests";
import { addUserToGroup } from "@/services/groups";
import { ArrowUpTrayIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/solid";

type GroupViewProps = {
  group: Group;
};

function GroupView(props: Readonly<GroupViewProps>) {
  const { group } = props;
  const indigoGroup = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const { meta } = group;
  const created = meta.created
    ? new Date(meta.created).toLocaleDateString()
    : "N/A";
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-2">
        <UserGroupIcon className="size-5" />
        <span className="text-lg font-bold">{group.displayName}</span>
      </p>

      <div className="flex flex-col">
        {indigoGroup.description ? (
          <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <ListBulletIcon className="size-4" />
            <span>{indigoGroup.description}</span>
          </p>
        ) : null}
        <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <ClockIcon className="size-4" />
          <span>Created {created ?? "N/A"}</span>
        </p>
      </div>
    </div>
  );
}

type MotivationFieldProps = {
  isAdmin: boolean;
};

function MotivationField(props: Readonly<MotivationFieldProps>) {
  const { isAdmin } = props;
  return (
    <Field className="flex flex-col">
      <Label data-required>Provide a motivation for your request</Label>
      <Textarea
        id="group-request-notes"
        name="group-request-notes"
        placeholder="Explain why you want to be a member of group..."
        className="iam-input w-full"
        required={!isAdmin}
      />
      <Description>
        This motivation will be show to the administrators that will manage your
        request.
      </Description>
    </Field>
  );
}

export interface JoinGroupModalProps extends ModalProps {
  user: User;
  isAdmin?: boolean;
}

export const JoinGroupModal = (props: JoinGroupModalProps) => {
  let { user, onClose, isAdmin, ...modalProps } = props;
  const [selected, setSelected] = useState<Group>();

  const selectGroup = (group: Group) => {
    setSelected(group);
  };

  const clearAndClose = () => {
    onClose();
    setTimeout(() => setSelected(undefined), 500);
  };

  const action = async (formData: FormData) => {
    if (isAdmin && selected) {
      await addUserToGroup(selected, user);
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
          {selected ? (
            <div className="space-y-4">
              <GroupView group={selected} />
              <MotivationField isAdmin={isAdmin ?? false} />
            </div>
          ) : (
            <Field>
              <Label>Select a Group to join</Label>
              <SearchGroups onSelect={selectGroup} />
            </Field>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-tertiary"
            type="button"
            onClick={clearAndClose}
          >
            Cancel
          </Button>
          <Button className="btn-primary" type="submit" disabled={!selected}>
            <ArrowUpTrayIcon className="size-4" />
            Send join request
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
