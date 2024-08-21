"use client";
import { Button } from "@/components/Buttons";
import { Form } from "@/components/Form";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Group } from "@/models/groups";
import { JoinGroupRequest } from "@/models/group-requests";
import { submitGroupRequest } from "@/services/group-requests";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { ScimUser } from "@/models/scim";
import SearchGroup from "@/components/SearchGroup";
import { useState } from "react";
import { addUserToGroup } from "@/services/groups";
import { Input } from "@/components/Inputs";
import { makeScimReferenceFromUser } from "@/utils/scim";

export interface JoinGroupModalProps extends ModalProps {
  user: ScimUser;
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

  return (
    <Modal {...modalProps} onClose={clearAndClose}>
      <Form action={action}>
        <ModalBody>
          <ModalBody>
            <section>
              <h4>Select a Group to join</h4>
              <SearchGroup
                className="mt-2"
                onClick={selectGroup}
                hidden={!!selected}
              />
              <div hidden={!selected}>
                <p>
                  Do you want to join group<b> {selected?.displayName}</b>?
                </p>
                <br />
                <b>Name</b>
                <p>{selected?.displayName}</p>
                <b>UUID</b>
                <p>{selected?.id}</p>
                <b>Labels</b>
                <p>{labels}</p>
              </div>
            </section>
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
