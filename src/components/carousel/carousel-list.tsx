// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabList, TabListProps } from "@headlessui/react";

interface CarouselListProps extends TabListProps {}

export default function CarouselList(props: CarouselListProps) {
  return <TabList {...props} hidden />;
}
