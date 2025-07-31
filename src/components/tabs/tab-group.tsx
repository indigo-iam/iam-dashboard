// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { TabGroup as HeadlessTabList, TabGroupProps } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function TabGroup(props: Readonly<TabGroupProps>) {
  const pathname = usePathname();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const tabIndex = sessionStorage.getItem(`${pathname}?tabIndex`);
    if (tabIndex) {
      setIndex(parseInt(tabIndex));
    }
  }, [pathname]);

  function onTabChange(index: number) {
    sessionStorage.setItem(`${pathname}?tabIndex`, index.toString());
    setIndex(index);
  }

  return (
    <HeadlessTabList selectedIndex={index} onChange={onTabChange} {...props} />
  );
}
