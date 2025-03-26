// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanels } from "@headlessui/react";

type CarouselPanelsProps = {
  children?: React.ReactNode;
};

export default function CarouselPanels(props: Readonly<CarouselPanelsProps>) {
  const { children } = props;
  return <TabPanels>{children}</TabPanels>;
}
