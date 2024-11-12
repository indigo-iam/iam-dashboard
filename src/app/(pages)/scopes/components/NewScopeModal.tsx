import Description from "@/components/Description";
import { Form, FormSection } from "@/components/Form";
import { Input } from "@/components/Inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { Button } from "@/components/Buttons";
import { PlusIcon } from "@heroicons/react/16/solid";
import Listbox, { ListboxOption } from "@/components/Listbox";
import { useState } from "react";
import { addScope } from "@/services/scopes";

interface NewScopeModalProps extends ModalProps {}

export default function NewScopeModal(props: Readonly<NewScopeModalProps>) {
  const { show, onClose } = props;
  const options = [
    { id: "none", name: "None" },
    { id: "default", name: "Default" },
    { id: "restricted", name: "Restricted" },
  ];
  const [scopeType, setScopeType] = useState<ListboxOption>(options[0]);

  const action = async (formData: FormData) => {
    const value = formData.get("value") as string;
    const description = formData.get("description") as string;
    const defaultScope = scopeType.id === "default";
    const restricted = scopeType.id === "restricted";
    const icon = "";
    await addScope({ value, description, defaultScope, restricted, icon });
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose} title="Add New Scope">
      <Form action={action} onReset={() => setScopeType(options[0])}>
        <ModalBody>
          <FormSection title="Scope" htmlFor="scope">
            <Description>Single string with no spaces.</Description>
            <Input id="scope" name="value" placeholder="Scope name" />
          </FormSection>
          <FormSection title="Description" htmlFor="description">
            <Description>Single string with no spaces.</Description>
            <Input
              id="scope"
              name="description"
              placeholder="Scope description"
            />
          </FormSection>
          <FormSection title="Scope Type" htmlFor="type">
            <Description>
              <b>Default</b>: newly-created clients get this scope by default.{" "}
              <br />
              <b>Restricted</b>: only usable by system administrators and are
              unavailable to dynamically registered clients and protected
              resources. <br />
              <b>None</b>: none of above.
            </Description>
            <Listbox
              name="scope-type"
              options={options}
              title={scopeType.name}
              selected={scopeType}
              onChange={setScopeType}
            />
          </FormSection>
        </ModalBody>
        <ModalFooter>
          <Button action="primary" icon={<PlusIcon />} type="submit">
            Add Scope
          </Button>
          <Button action="danger-outline" type="reset">
            Reset
          </Button>
          <Button action="primary-outline" type="reset" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
