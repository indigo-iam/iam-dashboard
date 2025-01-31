"use client";
import { Button } from "@/components/buttons";
import { Form, Field, Label } from "@/components/form";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Group } from "@/models/groups";
import { JoinGroupRequest } from "@/models/group-requests";
import { submitGroupRequest } from "@/services/group-requests";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { User } from "@/models/scim";
import { useState } from "react";
import { addUserToGroup, searchGroup } from "@/services/groups";
import { Input } from "@/components/inputs";
import { makeScimReferenceFromUser } from "@/utils/scim";
import Combobox from "@/components/combobox";
import InfoTable from "@/components/info-table";

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
              <Combobox
                onSelected={selectGroup}
                searchCallback={searchGroup}
              />
            </Field>
          </div>
          <div className="space-y-4" hidden={!selected}>
            <p>
              Do you want to join group<b> {selected?.displayName}</b>?
            </p>
            <InfoTable data={data} />
          </div>
          {!isAdmin ? (
            <section>
              <h4> Provide a motivation for your request</h4>
              <p>
                This motivation will be show to the administrators that will
                manage your request.
              </p>
              <Input
                id="group-request-notes"
                name="group-request-notes"
                placeholder="Explain why you want to be a member of group..."
                className="mt-2"
                required={!isAdmin}
              />
            </section>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button type="submit" action="primary" icon={<ArrowUpTrayIcon />}>
            Add group
          </Button>
          <Button
            type="button"
            action="danger"
            onClick={clearAndClose}
            icon={<XMarkIcon />}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
