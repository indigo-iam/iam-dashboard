import { ListboxButton as HeadlessListboxButton } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type ListboxButtonProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function ListboxButton(props: Readonly<ListboxButtonProps>) {
  const { children, className } = props;
  return (
    <HeadlessListboxButton
      className={`relative block rounded-md border px-2 py-1 text-left shadow-md dark:bg-white/10 ${className}`}
    >
      <div className="flex flex-row justify-between gap-2">
        {children}
        <ChevronDownIcon className="right-0 my-auto size-4" />
      </div>
    </HeadlessListboxButton>
  );
}
