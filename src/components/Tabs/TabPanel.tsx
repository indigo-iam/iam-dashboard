import { TabPanel as HeadlessUITabPanel } from "@headlessui/react";

type TapPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function TabPanel(props: Readonly<TapPanelProps>) {
  const { children, className } = props;
  return (
    <HeadlessUITabPanel className={"rounded-lg p-4 shadow " + className}>
      {children}
    </HeadlessUITabPanel>
  );
}
