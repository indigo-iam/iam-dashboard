import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

type OptionsProps = {
  children?: React.ReactNode;
};

export default function Options(props: Readonly<OptionsProps>) {
  const { children } = props;
  return (
    <Popover className="relative my-auto size-8">
      <PopoverButton data-test="option">
        <EllipsisHorizontalIcon className="size-8 text-primary/75" />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="flex flex-col rounded-lg bg-gray-50 shadow dark:bg-white/10 dark:backdrop-blur-lg"
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
}
