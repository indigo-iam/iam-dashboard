import { TabPanels } from "@headlessui/react";

type CarouselPanelsProps = {
  children?: React.ReactNode;
};

export default function CarouselPanels(props: Readonly<CarouselPanelsProps>) {
  const { children } = props;
  return <TabPanels>{children}</TabPanels>;
}
