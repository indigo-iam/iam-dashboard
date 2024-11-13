import { Tab as HeadlessUITab } from "@headlessui/react";

export type TabProps = {
  children?: React.ReactNode;
};

export default function Tab(props: Readonly<TabProps>) {
  const { children, ...other } = props;
  return (
    <HeadlessUITab
      {...other}
      className="mx-0.5 rounded-t-md px-3 py-1 text-secondary-300 hover:border-b-2 hover:border-secondary-200 hover:bg-secondary-100 data-[selected]:border-b-2 data-[selected]:border-primary data-[selected]:bg-primary/10 data-[selected]:text-primary dark:bg-white/5 dark:hover:bg-white/15 dark:data-[selected]:border-secondary dark:data-[selected]:bg-white/10 dark:data-[selected]:text-secondary"
    >
      <small>{children}</small>
    </HeadlessUITab>
  );
}
