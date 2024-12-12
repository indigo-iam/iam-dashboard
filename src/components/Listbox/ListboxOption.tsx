import { ListboxOption as HeadlessListboxOption } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";

export interface ListboxOptionProps {
  children: React.ReactNode;
  value: { id: string; name: string };
}

export default function ListboxOption(props: ListboxOptionProps) {
  const { children, value } = props;
  return (
    <HeadlessListboxOption
      className="group flex cursor-pointer select-none gap-1 rounded-md px-2 py-1 data-[focus]:bg-primary/80 data-[focus]:text-secondary dark:data-[focus]:bg-white/25"
      value={value}
    >
      <CheckIcon className="invisible my-auto size-4 group-data-[selected]:visible" />
      {children}
    </HeadlessListboxOption>
  );
}
