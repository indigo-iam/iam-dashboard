"use client";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalProps,
  MultiChoiceDropdown,
  MultiChoiceItem,
  MultiChoiceItemI,
} from "@/components";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import { Group } from "@/models/Groups";

const Body = (props: {
  items: MultiChoiceItemI[];
  selected: MultiChoiceItemI[];
}) => {
  return (
    <ModalBody>
      <p>
        <b>Select one or more groups</b>
      </p>
      <p>
        Only one groups that user is not already a member will be shown.
        <br />
        Type more characters to refine the group search.
      </p>
      <div>
        <MultiChoiceDropdown
          placeholder="Type in the group name or press enter..."
          {...props}
        />
      </div>
    </ModalBody>
  );
};

const Footer = (props: { onClose: () => void }) => {
  const { onClose } = props;
  return (
    <ModalFooter>
      <div className="flex justify-content-end p-2">
        <div className="row">
          <div className="col p-1">
            <Button
              className="my-auto"
              color="primary"
              icon={<ArrowUpTrayIcon />}
            >
              Add group(s)
            </Button>
          </div>
          <div className="col p-1">
            <Button
              className="my-auto"
              color="danger"
              onClick={onClose}
              icon={<XMarkIcon />}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </ModalFooter>
  );
};

const AddGroupForm = (props: { groups: Group[]; onClose: () => void }) => {
  const { groups, onClose } = props;
  const [choices, setChoices] = useState<MultiChoiceItemI[]>([]);

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

  const handleReset = () => {
    setChoices([]);
  };

  return (
    <Form id="add-group-form" onReset={handleReset}>
      <Body items={items} selected={choices} />
      <Footer onClose={onClose} />
    </Form>
  );
};

export interface AddGroupModalProps extends ModalProps {
  groups: Group[];
}

export const AddGroupModal = (props: AddGroupModalProps) => {
  const onClose = () => {
    const form = document.getElementById("add-group-form") as HTMLFormElement;
    form.reset();
    props.onClose?.();
  };

  let { groups, ...modalProps } = props;
  modalProps = { ...modalProps, onClose };
  return (
    <Modal {...modalProps}>
      <AddGroupForm groups={groups} onClose={onClose} />
    </Modal>
  );
};
