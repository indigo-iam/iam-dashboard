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
} from "@components";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useGroups } from "@services/Groups";
import { useCallback, useMemo, useState } from "react";

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
      <div className="d-flex justify-content-end p-2">
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

const AddGroupForm = (props: { onClose: () => void }) => {
  const { onClose } = props;
  const { groups } = useGroups();
  const [choices, setChoices] = useState<MultiChoiceItemI[]>([]);

  const addChoice = useCallback(
    (item: MultiChoiceItemI) => {
      console.log(item, choices);
      const found = choices.find(el => el.key === item.key);
      if (!found) {
        const update = [...choices].concat(item);
        setChoices(update);
      }
    },
    [choices]
  );

  const items: MultiChoiceItem[] = useMemo(
    () =>
      groups?.map(group => {
        const onSelect = (item: MultiChoiceItemI) => addChoice(item);
        return new MultiChoiceItem(
          group.id,
          group.displayName,
          group["urn:indigo-dc:scim:schemas:IndigoGroup"].description,
          onSelect
        );
      }) ?? [],
    [groups, addChoice]
  );

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

export const AddGroupModal = (props: ModalProps) => {
  const onClose = () => {
    const form = document.getElementById("add-group-form") as HTMLFormElement;
    form.reset();
    props.onClose?.();
  };
  const modalProps = { ...props, onClose };
  return (
    <Modal {...modalProps}>
      <AddGroupForm onClose={onClose} />
    </Modal>
  );
};
