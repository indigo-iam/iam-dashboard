import { TabGroup, TabGroupProps } from "@headlessui/react";

interface CarouselGroupProps extends TabGroupProps {}

export default function CarouselGroup(props: Readonly<CarouselGroupProps>) {
  return <TabGroup {...props} />;
}
