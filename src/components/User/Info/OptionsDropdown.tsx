import { Menu, MenuButton, MenuItem, MenuItems } from "@/components/Dropdown";
import {
  EllipsisHorizontalIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  BookmarkSquareIcon,
  CalendarIcon,
  DocumentTextIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";

export default function OptionsDropdown() {
  return (
    <Menu>
      <MenuButton className={"h-8 w-8 rounded-md hover:bg-secondary-100"}>
        <EllipsisHorizontalIcon />
      </MenuButton>
      <MenuItems>
        <MenuItem>
          <button type="button" className="flex gap-2 text-sm">
            <PencilSquareIcon className="w-5" />
            Edit details
          </button>
        </MenuItem>
        <MenuItem>
          <button type="button" className="flex gap-2 text-sm">
            <NoSymbolIcon className="w-5" />
            Disable User
          </button>
        </MenuItem>
        <MenuItem>
          <button type="button" className="flex gap-2 text-sm">
            <BookmarkSquareIcon className="w-5" />
            Assign admin privileges
          </button>
        </MenuItem>
        <MenuItem>
          <button type="button" className="flex gap-2 text-sm">
            <CalendarIcon className="w-5" />
            Change membership end time
          </button>
        </MenuItem>
        <MenuItem>
          <button type="button" className="flex gap-2 text-sm">
            <DocumentTextIcon className="w-5" />
            Sign AUP on behalf of this user
          </button>
        </MenuItem>
        <MenuItem>
          <button type="button" className="flex gap-2 text-sm">
            <DocumentTextIcon className="w-5" />
            Request AUP signature
          </button>
        </MenuItem>
        <MenuItem>
          <button type="button" className="flex gap-2 text-sm">
            <KeyIcon className="w-5" />
            Reset password
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
