import {
  Select as HeadlessSelect,
  SelectProps as HeadlessSelectProps,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface SelectProps extends HeadlessSelectProps {}

export default function Select(props: Readonly<SelectProps>) {
  return (
    <div className="relative w-48">
      <HeadlessSelect
        className="block w-full appearance-none rounded-md border bg-secondary p-2 shadow-md"
        {...props}
      />
      <ChevronDownIcon className="group absolute right-2.5 top-2.5 size-4" />
    </div>
  );
}
