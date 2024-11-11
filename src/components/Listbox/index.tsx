import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  Listbox as HeadlessListbox,
  ListboxOptions,
  ListboxButton,
  ListboxOption,
} from "@headlessui/react";

export type ListboxOption = {
  id: string;
  name: string;
};

type ListboxProps<T = ListboxOption | ListboxOption[]> = {
  name: string;
  title: string;
  options: ListboxOption[];
  selected: T;
  onChange: (value: T) => void;
  multiple?: boolean;
};

export default function Listbox<T>(props: Readonly<ListboxProps<T>>) {
  const { name, title, options, multiple, selected, onChange } = props;

  return (
    <div className="max-w-md">
      <HeadlessListbox
        multiple={multiple}
        value={selected}
        onChange={onChange}
        name={name}
      >
        <ListboxButton className="relative block w-full rounded-md border p-2 text-left shadow-md">
          {title}
          <ChevronDownIcon className="absolute right-2.5 top-2.5 size-4" />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom start"
          className="z-10 mt-2 !max-h-48 w-[var(--button-width)] rounded-lg border bg-secondary p-2 pb-4 shadow-md dark:bg-primary"
        >
          {options.map(o => (
            <ListboxOption
              key={o.id}
              value={o}
              className="group flex cursor-pointer select-none gap-2 rounded-md p-1 text-sm data-[focus]:bg-primary/80 data-[focus]:text-secondary"
            >
              <CheckIcon className="invisible my-auto size-4 group-data-[selected]:visible" />
              {o.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </HeadlessListbox>
    </div>
  );
}
