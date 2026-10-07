// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
  Popover,
  PopoverButton,
  PopoverOption,
  PopoverPanel,
} from "../popover";

type OptionProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  "data-danger"?: boolean;
  "data-testid"?: string;
};

export function Option(props: Readonly<OptionProps>) {
  const { children, ...other } = props;
  return <PopoverOption {...other}>{children}</PopoverOption>;
}

type OptionsProps = {
  children?: React.ReactNode;
};

export function Options(props: Readonly<OptionsProps>) {
  const { children } = props;
  return (
    <Popover>
      <PopoverButton
        data-testid="option"
        name="More"
        type="button"
        variant="plain"
        className="group relative my-auto cursor-pointer rounded-md transition hover:bg-gray-200 data-open:bg-gray-200 dark:hover:bg-gray-500 dark:data-active:bg-gray-200 dark:data-open:bg-gray-500"
      >
        <EllipsisHorizontalIcon className="size-8 text-gray-800 dark:text-gray-400" />
      </PopoverButton>
      <PopoverPanel className="[position-area:bottom_center]">
        {children}
      </PopoverPanel>
    </Popover>
  );
}
