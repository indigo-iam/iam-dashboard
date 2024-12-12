import {
  ListboxOptions as HeadlessListboxOptions,
  ListboxOptionsProps,
} from "@headlessui/react";

export default function ListboxOptions(props: Readonly<ListboxOptionsProps>) {
  return (
    <HeadlessListboxOptions
      {...props}
      anchor="bottom start"
      className="z-10 mt-2 !max-h-48 w-auto rounded-lg border bg-secondary p-2 shadow-md dark:bg-white/10 dark:backdrop-blur-md"
    />
  );
}
