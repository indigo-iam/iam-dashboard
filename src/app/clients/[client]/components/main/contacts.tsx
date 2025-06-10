// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { InputList } from "@/components/inputs";

type ContactsProps = {
  contacts?: string[];
};

export default function Contacts(props: Readonly<ContactsProps>) {
  const { contacts } = props;
  return (
    <InputList
      id="contacts_input"
      name="contacts"
      originalItems={contacts ?? []}
      type="email"
      placeholder="admin@example.com"
    />
  );
}
