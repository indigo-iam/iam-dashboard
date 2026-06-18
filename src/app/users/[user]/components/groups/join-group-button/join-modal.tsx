// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ConfirmModal from "@/components/confirm-modal";
import { Field, Label, Description } from "@/components/form";
import { Textarea } from "@/components/textarea";
import { toast } from "@/components/toaster";
import { JoinGroupRequest } from "@/models/group-requests";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { submitGroupRequest } from "@/services/group-requests";
import { SearchGroups } from "./search-groups";

import { UserGroupIcon } from "@heroicons/react/24/solid";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/solid";

import { useRef, useState } from "react";

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

function MotivationField() {
  return (
    <Field className="flex flex-col">
      <Label data-required>Provide a motivation for your request</Label>
      <Textarea
        id="group-request-notes"
        name="group-request-notes"
        placeholder="Explain why you want to be a member of group..."
        className="iam-input w-full"
        required={true}
      />
      <Description>
        This motivation will be show to the administrators that will manage your
        request.
      </Description>
    </Field>
  );
}

type JoinGroupModalProps = {
  user: User;
  show: boolean;
  onClose: () => void;
};

export function JoinGroupModal(props: Readonly<JoinGroupModalProps>) {
  const { user, show, onClose } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [selected, setSelected] = useState<Group>();
  const disabled = selected === undefined;

  function unselect() {
    setSelected(undefined);
  }

  function close() {
    onClose();
    setTimeout(unselect, 300);
  }

  async function submit() {
    if (!selected) {
      toast.warning("Cannot assign unknown user to group");
      return;
    }
    if (!formRef.current) {
      toast.warning("Cannot find 'motivation' form element");
      return;
    }

    const formData = new FormData(formRef.current.currentTarget);

    const req: JoinGroupRequest = {
      notes: formData.get("group-request-notes") as string,
      username: user.userName!,
      groupName: selected!.displayName,
    };
    const res = await submitGroupRequest(req);
    toast.toast(res);
    close();
  }

  return (
    <ConfirmModal
      show={show}
      onClose={close}
      title="Send join group request"
      onConfirm={submit}
      confirmButtonDisabled={disabled}
      onCancel={unselect}
    >
      {selected ? (
        <div className="space-y-4">
          <GroupView group={selected} />
          <MotivationField />
        </div>
      ) : (
        <Field>
          <Label>Select a group to join</Label>
          <SearchGroups listId="search-group-join" onSelect={setSelected} />
        </Field>
      )}
    </ConfirmModal>
  );
}
