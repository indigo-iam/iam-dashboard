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

type SecretProps = {
  secretValue: string;
};

export function InputSecret(props: Readonly<SecretProps>) {
  const { secretValue } = props;
  const [isVisible, setIsVisible] = useState(false);
  const icon = isVisible ? (
    <EyeSlashIcon className="size-5 dark:text-white/60" />
  ) : (
    <EyeIcon className="size-5 dark:text-white/60" />
  );
  const toggleVisibility = () => setIsVisible(!isVisible);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(secretValue);
    } catch (err) {
      console.error("Error during clipboard copy:", err);
    }
  };

  return (
    <div className="bg-border flex w-full rounded-md border border-white/30 bg-gray-100 break-all dark:bg-gray-800">
      <div className="w-full px-3 py-2">
        <input
          type={isVisible ? "text" : "password"}
          readOnly
          className="bg-border w-full bg-gray-100 focus:outline-none dark:bg-gray-800"
          value={secretValue}
        />
      </div>

      <div className="flex items-center rounded border-white/30 bg-white/30 dark:bg-gray-400">
        <Button
          title={isVisible ? "hide secret" : "show secret"}
          onClick={toggleVisibility}
          className="bg-white-30 gl-button-focus mr-1 ml-2 border-white/30 underline focus:outline-none dark:bg-gray-400"
        >
          {icon}
        </Button>
        <Button
          title="copy secret"
          className="bg-white-30 gl-button-focus mr-2 ml-1 border-white/30 underline focus:outline-none dark:bg-gray-400"
          onClick={copyToClipboard}
        >
          <ClipboardDocumentIcon className="size-5 dark:text-white/60" />
        </Button>
      </div>
    </div>
  );
}
