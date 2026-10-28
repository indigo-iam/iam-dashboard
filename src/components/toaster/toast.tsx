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

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

export type ToastComponentProps = ToastProps & {
  closing?: boolean;
};

export const TOAST_EXIT_DURATION = 300;
const TOAST_AUTO_DISMISS_DURATION = 3000;

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

export function Toast(props: Readonly<ToastComponentProps>) {
  const { id, title, description, type, closing = false } = props;
  const { close } = useToaster();
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) {
      return;
    }
    const updateCardHeight = () => {
      setCardHeight(card.offsetHeight);
    };
    updateCardHeight();
    const observer = new ResizeObserver(updateCardHeight);
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => close(id), TOAST_AUTO_DISMISS_DURATION);
    return () => clearTimeout(timeout);
  }, [close, id]);

  return (
    <div
      className={`overflow-hidden transition-[height] duration-300 ease-in-out data-closing:h-0 h-[${cardHeight}px]`}
      data-closing={closing || null}
    >
      <div
        className="animate-slidein m-auto flex max-w-fit min-w-48 items-center rounded-lg border bg-white px-3 py-2 transition-all duration-300 ease-in-out data-closing:translate-x-[150%]"
        data-testid="toast"
        data-closing={closing || null}
        data-toast-type={type ?? "default"}
        ref={cardRef}
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
          onClick={() => close(id)}
        >
          <XCircleIcon />
        </Button>
      </div>
    </div>
  );
}
