import { TabList as HeadlessUITabList } from "@headlessui/react";

export type TabListProps = {
  children?: React.ReactNode;
};

export default function TabList(props: Readonly<TabListProps>) {
  return (
    <HeadlessUITabList className="flex">{props.children}</HeadlessUITabList>
  );
}
