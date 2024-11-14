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
    <HeadlessListbox
      multiple={multiple}
      value={selected}
      onChange={onChange}
      name={name}
    >
      <ListboxButton className="relative block w-full rounded-md border px-2 py-1 text-left shadow-md dark:bg-white/10">
        <div className="flex flex-row gap-1">
          {title}
          <ChevronDownIcon className="m-auto size-4" />
        </div>
      </ListboxButton>
      <ListboxOptions
        anchor="bottom start"
        className="z-10 mt-2 !max-h-48 w-auto rounded-lg border bg-secondary p-2 shadow-md dark:bg-white/10 dark:backdrop-blur-md"
      >
        {options.map(o => (
          <ListboxOption
            key={o.id}
            value={o}
            className="group flex cursor-pointer select-none gap-2 rounded-md p-1 text-sm data-[focus]:bg-primary/80 data-[focus]:text-secondary dark:data-[focus]:bg-white/25"
          >
            <CheckIcon className="invisible my-auto size-4 group-data-[selected]:visible" />
            {o.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </HeadlessListbox>
  );
}
