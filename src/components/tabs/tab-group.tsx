// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useSessionStorage } from "@/utils/hooks";
import { TabGroup as HeadlessTabList, TabGroupProps } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function TabGroup(props: Readonly<TabGroupProps>) {
  const pathname = usePathname();
  const { setItem, getItem } = useSessionStorage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function getIndex() {
      const tabIndex = parseInt(getItem(`${pathname}?tabIndex`) ?? "0");
      setIndex(tabIndex);
    }
    getIndex();
  }, [getItem, pathname]);

  function onTabChange(index: number) {
    setItem(`${pathname}?tabIndex`, index.toString());
    setIndex(index);
  }

  return (
    <HeadlessTabList selectedIndex={index} onChange={onTabChange} {...props} />
  );
}
