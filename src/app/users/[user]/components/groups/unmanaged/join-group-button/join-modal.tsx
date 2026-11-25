// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ConfirmModal from "@/components/confirm-modal";
import { Description } from "@/components/description";
import { Field } from "@/components/field";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import { useToaster } from "@/components/toaster";
import { JoinGroupRequest } from "@/models/group-requests";
import { Group } from "@/models/groups";
import { submitGroupRequest } from "@/services/group-requests";
import { SearchGroups } from "./search-groups";

import { useRef, useState } from "react";
import { Notice } from "@/components/notices";

type GroupViewProps = {
  group: Group;
};

function GroupView(props: Readonly<GroupViewProps>) {
  const { group } = props;
  const indigoGroup = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  return (
    <div className="space-y-4">
      <p>
        Send a request to join the following group and obtain access to its
        resources. An administrator will review your request.
      </p>
      <Notice>
        <div className="flex flex-col items-center">
          <p>
            <b>{group.displayName}</b>
          </p>
          {indigoGroup.description && (
            <p className="text-sm">{indigoGroup.description}</p>
          )}
        </div>
      </Notice>
    </div>
  );
}

const MIN_MOTIVATION_LENGTH = 6;

type JoinGroupModalProps = {
  show: boolean;
  onClose: () => void;
  userName: string;
};

export function JoinGroupModal(props: Readonly<JoinGroupModalProps>) {
  const { show, onClose, userName } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [selected, setSelected] = useState<Group | null>(null);
  const [motivation, setMotivation] = useState<string>();
  const toast = useToaster();
  const enabled =
    selected && (motivation?.length ?? 0) >= MIN_MOTIVATION_LENGTH;

  function unselect() {
    setSelected(null);
    setMotivation("");
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

    const formData = new FormData(formRef.current);

    const req: JoinGroupRequest = {
      notes: formData.get("group-request-notes") as string,
      username: userName,
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
      confirmButtonDisabled={!enabled}
      onCancel={close}
      formRef={formRef}
    >
      {selected ? (
        <div className="space-y-4">
          <GroupView group={selected} />
          <Field className="flex flex-col">
            <Label>Provide a motivation for your request</Label>
            <Textarea
              name="group-request-notes"
              placeholder="Explain why you want to be a member of group..."
              required={true}
              onChange={e => setMotivation(e.currentTarget.value)}
              minLength={MIN_MOTIVATION_LENGTH}
            />
            <Description>
              {`This motivation will be show to the administrators that will manage your request. It must contain at least ${MIN_MOTIVATION_LENGTH} characters.`}
            </Description>
          </Field>
        </div>
      ) : (
        <>
          <p>
            Send a request to join a group and obtain access to its resources.
            An administrator will review your request.
          </p>
          <Field>
            <SearchGroups onSelect={setSelected} />
          </Field>
        </>
      )}
    </ConfirmModal>
  );
}
