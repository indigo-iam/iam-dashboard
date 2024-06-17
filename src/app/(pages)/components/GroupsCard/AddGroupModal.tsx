"use client";
import {
  Button,
  Form,
  MultiChoiceDropdown,
  MultiChoiceItem,
  MultiChoiceItemI,
} from "@/components";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useCallback, useState, useTransition } from "react";
import { Group } from "@/models/groups";
import { Me } from "@/models/me";
import { JoinGroupRequest } from "@/models/group-requests";
import { submitGroupRequest } from "@/services/group-requests";
import Modal, { ModalBody, ModalFooter, ModalProps } from "@/components/Modal";

const Body = (props: {
  items: MultiChoiceItemI[];
  selected: MultiChoiceItemI[];
  onDeselect: (item: MultiChoiceItem) => void;
  setNotes: (notes: string) => void;
}) => {
  const { setNotes, ...dropdownProps } = props;
  setNotes("test notes");

  return (
    <ModalBody>
      <div className="space-y-3">
        <h3>Select one or more groups</h3>
        <p>
          Only one groups that user is not already a member will be shown.
          <br />
          Type more characters to refine the group search.
        </p>
        <MultiChoiceDropdown
          placeholder="Type in the group name or press enter..."
          {...dropdownProps}
        />
      </div>
    </ModalBody>
  );
};

const Footer = (props: {
  onSubmit: () => void;
  isPending: boolean;
  onClose: () => void;
}) => {
  const { onSubmit, onClose, isPending } = props;
  return (
    <ModalFooter>
      <div className="flex justify-end p-2">
        <div className="col p-1">
          <Button
            type="button"
            action="primary"
            icon={<ArrowUpTrayIcon />}
            onClick={onSubmit}
            disabled={isPending}
          >
            Add group(s)
          </Button>
        </div>
        <div className="col p-1">
          <Button
            type="button"
            action="danger"
            onClick={onClose}
            icon={<XMarkIcon />}
          >
            Cancel
          </Button>
        </div>
      </div>
    </ModalFooter>
  );
};

const AddGroupForm = (props: {
  me: Me;
  groups: Group[];
  onClose: () => void;
}) => {
  const { me, groups, onClose } = props;
  const [choices, setChoices] = useState<MultiChoiceItemI[]>([]);
  const [isPending, startTransition] = useTransition();
  let notes = ""; // TODO: add notes field

  const addChoice = useCallback(
    (item: MultiChoiceItemI) => {
      const found = choices.find(el => el.key === item.key);
      if (!found) {
        const update = [...choices].concat(item);
        setChoices(update);
      }
    },
    [choices]
  );

  const setNotes = (newNotes: string) => (notes = newNotes);

  const items: MultiChoiceItem[] =
    groups.map(group => {
      const onSelect = (item: MultiChoiceItemI) => addChoice(item);
      return new MultiChoiceItem(
        group.id,
        group.displayName,
        group["urn:indigo-dc:scim:schemas:IndigoGroup"].description,
        onSelect
      );
    }) ?? [];

  const deselectItem = (item: MultiChoiceItem) => {
    setChoices(choices.filter(el => item.key !== el.key));
  };

  const handleReset = () => {
    setChoices([]);
  };

  const handleSubmit = async () => {
    startTransition(async () => {
      const joinGroupRequests = choices.map(choice => {
        const groupName = choice.title;
        const req: JoinGroupRequest = {
          notes,
          username: me.userName,
          groupName,
        };
        return submitGroupRequest(req);
      });
      const results = await Promise.all(joinGroupRequests);
      results.forEach(error => {
        if (error) {
          console.error(`Failed to submit request with status: ${error}`);
        }
      });
      props.onClose?.();
    });
  };

  return (
    <Form id="add-group-form" onSubmit={handleSubmit} onReset={handleReset}>
      <Body
        items={items}
        selected={choices}
        onDeselect={deselectItem}
        setNotes={setNotes}
      />
      <Footer onSubmit={handleSubmit} isPending={isPending} onClose={onClose} />
    </Form>
  );
};

export interface AddGroupModalProps extends ModalProps {
  me: Me;
  groups: Group[];
}

export const AddGroupModal = (props: AddGroupModalProps) => {
  const onClose = () => {
    const form = document.getElementById("add-group-form") as HTMLFormElement;
    form.reset();
    props.onClose?.();
  };

  let { me, groups, ...modalProps } = props;
  modalProps = { ...modalProps, onClose };
  return (
    <Modal {...modalProps}>
      <AddGroupForm me={me} groups={groups} onClose={onClose} />
    </Modal>
  );
};
