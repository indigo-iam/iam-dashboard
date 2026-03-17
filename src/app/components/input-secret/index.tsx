// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Input } from "@/components/inputs";
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
    <div className="iam-input divide-primary/10 flex divide-x p-0! font-mono text-sm">
      <Input type={isVisible ? "text" : "password"} readOnly value={value} />
      <div className="flex items-center rounded">
        <Button
          title="Show/Hide secret"
          onClick={toggleVisibility}
          className="btn-secondary h-full items-center rounded-none border-0 border-r dark:border-t dark:border-b dark:border-gray-700"
        >
          <Icon secretIsVisible={isVisible} />
        </Button>
        <Button
          title="Copy secret"
          className="btn-secondary h-full items-center rounded-none rounded-r border-0 dark:border dark:border-gray-700"
          onClick={copyToClipboard}
        >
          <ClipboardDocumentIcon className="size-5 dark:text-white/60" />
        </Button>
      </div>
    </div>
  );
}
