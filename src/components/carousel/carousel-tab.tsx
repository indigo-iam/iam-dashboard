// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Tab } from "@headlessui/react";

type CarouselTabProps = {
  children?: React.ReactNode;
};

export default function CarouselTab(props: Readonly<CarouselTabProps>) {
  const { children } = props;
  return <Tab>{children}</Tab>;
}
