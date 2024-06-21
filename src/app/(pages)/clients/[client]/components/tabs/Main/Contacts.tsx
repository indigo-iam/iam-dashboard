"use client";
import InputList from "@/components/InputList";
import { useState } from "react";

type ContactsProps = {
  contacts?: string[];
};

export default function Contacts(props: Readonly<ContactsProps>) {
  const [contacts, setContacts] = useState(props.contacts ?? []);

  const addRedirectUri = (contact: string) => {
    if (!contacts.find(c => c === contact)) {
      setContacts([...contacts, contact]);
    } else {
      console.warn("address already present");
    }
  };
  const removeRedirectUri = (index: number) => {
    setContacts(contacts.toSpliced(index, 1));
  };
  return (
    <InputList
      id="contacts_input"
      name="contacts_input"
      items={contacts}
      type="email"
      placeholder="admin@example.com"
      addItem={addRedirectUri}
      removeItem={removeRedirectUri}
    />
  );
}
