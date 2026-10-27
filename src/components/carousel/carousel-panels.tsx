// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanels, TabPanelsProps } from "@/components/tabs";

type CarouselPanelsProps = TabPanelsProps;

export default function CarouselPanels(props: Readonly<CarouselPanelsProps>) {
  return <TabPanels {...props} />;
}
