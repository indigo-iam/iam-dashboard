// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabList, TabListProps } from "@/components/tabs";

type CarouselListProps = TabListProps;

export default function CarouselList(props: CarouselListProps) {
  return <TabList {...props} hidden />;
}
