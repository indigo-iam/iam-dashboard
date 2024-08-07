import { TabPanel as HeadlessUITabPanel } from "@headlessui/react";

type TapPanelProps = {
  children: React.ReactNode;
  className?: string;
  unmount?: boolean;
};

export default function TabPanel(props: Readonly<TapPanelProps>) {
  const { children, className, unmount } = props;
  return (
    <HeadlessUITabPanel
      unmount={unmount}
      className={"rounded-lg p-4 shadow " + className}
    >
      {children}
    </HeadlessUITabPanel>
  );
}
