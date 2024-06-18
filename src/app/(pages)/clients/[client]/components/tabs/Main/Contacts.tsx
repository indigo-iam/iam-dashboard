"use client";
import InputList from "@/components/InputList";
import { useState } from "react";

type ContactsProps = {
  contacts?: string[];
};

export default function Contacts(props: Readonly<ContactsProps>) {
  const [contacts, setContacts] = useState(props.contacts ?? []);

  const addRedirectUri = (contact: string) => {
    setContacts([...contacts, contact]);
  };
  const removeRedirectUri = (index: number) => {
    setContacts(contacts.toSpliced(index, 1));
  };
  return (
    <InputList
      id="contacts-input"
      name="contacts-input"
      items={contacts}
      type="url"
      placeholder="admin@example.com"
      addItem={addRedirectUri}
      removeItem={removeRedirectUri}
    />
  );
}
