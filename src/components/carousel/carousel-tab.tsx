import { Tab } from "@headlessui/react";

type CarouselTabProps = {
  children?: React.ReactNode;
};

export default function CarouselTab(props: Readonly<CarouselTabProps>) {
  const { children } = props;
  return <Tab>{children}</Tab>;
}