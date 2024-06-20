import { Tab as HeadlessUITab } from "@headlessui/react";

export type TabProps = {
  children?: React.ReactNode;
};

export default function Tab(props: Readonly<TabProps>) {
  const { children, ...other } = props;
  return (
    <HeadlessUITab
      {...other}
      className="mx-0.5 w-full rounded-t-md px-3 py-1 text-secondary-300 hover:border-b-2 hover:border-secondary-200 hover:bg-secondary-100 data-[selected]:border-b-2 data-[selected]:border-primary data-[selected]:text-primary"
    >
      <small>{children}</small>
    </HeadlessUITab>
  );
}
