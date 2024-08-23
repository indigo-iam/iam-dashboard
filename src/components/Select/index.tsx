import {
  Select as HeadlessSelect,
  SelectProps as HeadlessSelectProps,
} from "@headlessui/react";

interface SelectProps extends HeadlessSelectProps {}

export default function Select(props: Readonly<SelectProps>) {
  return (
    <HeadlessSelect
      className="rounded-md border bg-secondary p-2 shadow-md"
      {...props}
    />
  );
}
