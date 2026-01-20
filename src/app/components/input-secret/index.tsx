// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

'use client';

import { useState } from "react";
import { Button } from "../../../components/buttons";
import {
  ClipboardDocumentIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/solid';

type SecretProps = {
  secretValue: string;
};

export function InputSecret(props: Readonly<SecretProps>) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.secretValue);
    } catch (err) {
      console.error('Error during clipboard copy:', err);
    }
  };

  const changeIcon = () => {
    if (isVisible) {
      return <EyeSlashIcon className="size-5 dark:text-white/60" />
    } else {
      return <EyeIcon className="size-5 dark:text-white/60" />
    }
  };

  return (
    <div className="flex w-full break-all rounded-md border border-white/30 bg-gray-100 dark:bg-gray-800 bg-border">
      <div className="w-full px-3 py-2">
        <input
          type={isVisible ? 'text' : 'password'}
          readOnly
          className="w-full bg-gray-100 dark:bg-gray-800 bg-border focus:outline-none"
          value={props.secretValue}
        />
      </div>

      <div className="flex items-center gl-button-group btn-group bg-white/30 dark:bg-gray-400 border-white/30 rounded">
        <Button
          onClick={toggleVisibility}
          className="ml-2 mr-1 underline border-white/30 bg-white-30 dark:bg-gray-400 gl-button-focus focus:outline-none"
        >
          {changeIcon()}
        </Button>

        <Button
          className="ml-1 mr-2 underline border-white/30 bg-white-30 dark:bg-gray-400 gl-button-focus focus:outline-none"
          onClick={copyToClipboard}
        >
          <ClipboardDocumentIcon className="size-5 dark:text-white/60" />
        </Button>
      </div>
    </div>
  );
}
