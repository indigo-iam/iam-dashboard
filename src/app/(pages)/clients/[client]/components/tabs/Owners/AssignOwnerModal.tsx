"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { User } from "@/models/user";
import { searchUser } from "@/services/users";
import { useRef, useState } from "react";

type ResultsDropDownProps = {
  results: User[];
  onClick: (user: User) => void;
};

function ResultsDropDown(props: Readonly<ResultsDropDownProps>) {
  const { results, onClick } = props;

  if (results.length === 0) {
    return null;
  }

  return (
    <ul className="absolute z-50 mx-auto w-full rounded-xl border bg-secondary">
      {results.map(el => {
        return (
          <li
            key={el.id}
            className="p-2 text-sm first:rounded-t-xl last:rounded-b-xl hover:cursor-pointer hover:bg-primary-700 hover:text-secondary"
            onClick={() => onClick(el)}
          >
            <b>{el.name.formatted}</b> ({el.displayName})
          </li>
        );
      })}
    </ul>
  );
}

interface AssignOwnerModal extends ModalProps {}

export default function AssignOwnerModal(props: Readonly<AssignOwnerModal>) {
  const timeoutRef = useRef<number | null>();
  const [results, setResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();

  const searchCallback = async (filter: string) => {
    if (filter.length > 2) {
      const found = await searchUser(filter);
      setResults(found);
    } else {
      setResults([]);
    }
  };

  const delayedSearch = (filter: string) => {
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = window.setTimeout(() => searchCallback(filter), 150);
  };

  const addOwner = (user: User) => {
    setResults([]);
    setSelectedUser(user);
    console.log(user);
  };

  const clearAndClose = () => {
    if (results.length > 0) {
      setResults([]);
    }
    if (selectedUser) {
      setSelectedUser(undefined);
    }
    props?.onClose();
  };

  return (
    <Modal {...props}>
      <ModalBody>
        <div className="relative" hidden={!!selectedUser}>
          <Input
            onKeyUp={e => delayedSearch(e.currentTarget.value)}
            placeholder="Type to search..."
          />
          <ResultsDropDown onClick={addOwner} results={results} />
        </div>
        <div hidden={!selectedUser}>
          <p>Selected user: </p>
          <b>Name</b>
          <p>{selectedUser?.name.formatted}</p>
          <b>Username</b>
          <p>{selectedUser?.userName}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button action="primary">Assign Owner</Button>
        <Button action="danger-outline" onClick={clearAndClose}>
          Cancel{" "}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
