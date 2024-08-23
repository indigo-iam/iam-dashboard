import { TabList, TabListProps } from "@headlessui/react";

interface CarouselListProps extends TabListProps {}

export default function CarouselList(props: CarouselListProps) {
  return <TabList {...props} hidden />;
}
