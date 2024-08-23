import { InputList } from "@/components/Inputs";

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
