// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabGroup, TabGroupProps } from "@headlessui/react";

interface CarouselGroupProps extends TabGroupProps {}

export default function CarouselGroup(props: Readonly<CarouselGroupProps>) {
  return <TabGroup {...props} />;
}
