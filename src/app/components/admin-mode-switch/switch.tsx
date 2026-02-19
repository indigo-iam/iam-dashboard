// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Switch as HUISwitch } from "@headlessui/react";
import { useRef } from "react";

type SwitchProps = {
  defaultChecked?: boolean;
};

export default function Switch(props: Readonly<SwitchProps>) {
  const { defaultChecked } = props;
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  function handleChange() {
    setTimeout(() => buttonRef.current?.click(), 500);
  }

  return (
    <>
      <HUISwitch
        type="submit"
        name="admin_mode"
        defaultChecked={defaultChecked}
        onClick={handleChange}
        className="group data-checked:bg-danger inline-flex h-5 w-10 items-center rounded-full bg-white/20 transition md:bg-gray-200 dark:bg-white/20"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-5" />
      </HUISwitch>
      <button ref={buttonRef} type="submit" hidden />
    </>
  );
}
