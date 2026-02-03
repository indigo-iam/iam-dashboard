// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import {
  ClipboardDocumentIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

type IconProps = {
  secretIsVisible: boolean;
};

function Icon(props: Readonly<IconProps>) {
  const { secretIsVisible } = props;
  if (secretIsVisible) {
    return <EyeSlashIcon className="size-5 dark:text-white/60" />;
  }
  return <EyeIcon className="size-5 dark:text-white/60" />;
}

type InputSecretProps = {
  value?: string;
};

export function InputSecret(props: Readonly<InputSecretProps>) {
  const { value } = props;
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value ?? "");
    } catch (err) {
      console.error("Error during clipboard copy:", err);
    }
  };

  return (
    <div className="iam-input divide-primary/10 flex divide-x p-0!">
      <input
        type={isVisible ? "text" : "password"}
        readOnly
        className="bg-border w-full p-2 focus:outline-none dark:bg-gray-800"
        value={value}
      />
      <div className="flex items-center rounded">
        <Button
          title="Show/Hide secret"
          onClick={toggleVisibility}
          className="btn-secondary h-full items-center rounded-none border-0 border-r"
        >
          <Icon secretIsVisible={isVisible} />
        </Button>
        <Button
          title="Copy secret"
          className="btn-secondary h-full items-center rounded-none rounded-r border-0"
          onClick={copyToClipboard}
        >
          <ClipboardDocumentIcon className="size-5 dark:text-white/60" />
        </Button>
      </div>
    </div>
  );
}
