import { CarouselPanel } from "@/components/Carousel";
import { Menu, MenuButton, MenuItem, MenuItems } from "@/components/Dropdown";
import Field from "@/components/Field";
import Label from "@/components/Label";
import Section from "@/components/Section";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/16/solid";

const Scope = (props: { item: string; name: string }) => {
  const { item, name } = props;
  return (
    <li key={item} className="mt-1 flex flex-row items-center gap-2 text-sm">
      <button
        type="button"
        className="w-5 rounded bg-secondary-100 hover:bg-danger hover:text-secondary"
      >
        <XMarkIcon />
      </button>
      <input
        className="w-full"
        defaultValue={item}
        name={name}
        contentEditable={false}
      />
    </li>
  );
};

export default function OIDCSettings() {
  return (
    <CarouselPanel unmount={false}>
      <Section title="OpenID Connect - OAuth2">
        <Field>
          <Label>Client Authentication</Label>
          <Menu>
            <MenuButton className="flex flex-row rounded-lg border p-2 hover:bg-gray-100">
              HTTP basic authentication
              <ChevronDownIcon className="h-5 w-5" />
            </MenuButton>
            <MenuItems>
              <MenuItem>HTTP basic authentication</MenuItem>
              <MenuItem>HTTP POST authentication</MenuItem>
              <MenuItem>Symmetrical signed JWT assertion</MenuItem>
              <MenuItem>Symmetrical signed JWT assertion</MenuItem>
            </MenuItems>
          </Menu>
        </Field>
        <Field>
          <Label>Authentication Flow</Label>
          <Menu>
            <MenuButton className="flex flex-row rounded-lg border p-2 hover:bg-gray-100">
              Authorization Flow
              <ChevronDownIcon className="h-5 w-5" />
            </MenuButton>
            <MenuItems>
              <MenuItem>Authorization Flow</MenuItem>
              <MenuItem>Implicit Flow</MenuItem>
              <MenuItem>Device Code Flow</MenuItem>
              <MenuItem>Client Credentials</MenuItem>
              <MenuItem>Token Exchange</MenuItem>
            </MenuItems>
          </Menu>
        </Field>
        <Field>
          <Label>Scopes</Label>
          <Menu>
            <MenuButton className="flex flex-row rounded-lg border p-2 hover:bg-gray-100">
              Scopes
              <ChevronDownIcon className="h-5 w-5" />
            </MenuButton>
            <MenuItems>
              <MenuItem>Authorization Flow</MenuItem>
              <MenuItem>Implicit Flow</MenuItem>
              <MenuItem>Device Code Flow</MenuItem>
              <MenuItem>Client Credentials</MenuItem>
              <MenuItem>Token Exchange</MenuItem>
            </MenuItems>
          </Menu>
          <ul className="mt-2">
            <Scope item="Email" name="Email" />
            <Scope item="OpenID" name="OpenID" />
            <Scope item="Profile" name="Profile" />
          </ul>
        </Field>
      </Section>
    </CarouselPanel>
  );
}
