// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { useTimeout } from "@/utils/hooks";
import { Button } from "../buttons";
import { useToaster } from "./context";

export type ToastTypes =
  | "normal"
  | "action"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "loading"
  | "default";

export type ToastProps = {
  id: number;
  title: string;
  description?: string;
  type: ToastTypes;
};

function Icon(props: Readonly<{ toastType: ToastTypes }>) {
  const { toastType } = props;
  switch (toastType) {
    case "info":
      return (
        <InformationCircleIcon
          className="size-6 text-gray-950"
          aria-label="Info"
        />
      );
    case "success":
      return (
        <CheckCircleIcon
          key="check-icon"
          className="text-success size-6 flex-none"
          aria-label="Success"
        />
      );
    case "warning":
      return (
        <ExclamationTriangleIcon
          key="danger-icon"
          className="text-warning size-6 flex-none"
          aria-label="Warning"
        />
      );
    case "error":
      return (
        <ExclamationCircleIcon
          key="danger-circle-icon"
          className="text-danger size-6 flex-none"
          aria-label="Error"
        />
      );
    default:
  }
}

export function Toast(props: Readonly<ToastProps>) {
  const { title, description, type } = props;
  const { close } = useToaster();
  useTimeout(() => close(props.id), 3000);
  return (
    <div
      className="animate-slidein m-auto flex max-w-fit min-w-48 items-center rounded-lg border bg-white px-3 py-2 transition-all"
      data-testid="toast"
      data-toast-type={type ?? "default"}
    >
      <div className="flex grow items-center gap-2">
        {type && <Icon toastType={type} />}
        <div>
          <p className="text-normal font-semibold">{title}</p>
          {description && (
            <p className="block text-sm text-gray-500 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
      </div>
      <Button
        title="Close"
        variant="plain"
        className="w-8 flex-none cursor-pointer rounded-full p-1.25 text-gray-500 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-500"
        type="button"
        onClick={() => close(props.id)}
      >
        <XCircleIcon />
      </Button>
    </div>
  );
}
