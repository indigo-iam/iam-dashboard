import { TabPanel as HeadlessUITabPanel } from "@headlessui/react";

type TapPanelProps = {
  children: React.ReactNode;
};

export default function TabPanel(props: Readonly<TapPanelProps>) {
  const { children } = props;
  return (
    <HeadlessUITabPanel className="rounded-lg p-4 shadow">
      {children}
    </HeadlessUITabPanel>
  );
}
