// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect, useRef, useState } from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

function CloseButton() {
  return (
    <button
      title="Close"
      className="mr-0 ml-auto w-8 cursor-pointer rounded-full p-1.25 text-gray-500 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-500"
    >
      <XCircleIcon />
    </button>
  );
}

function useUpdateToasterPosition() {
  const [position, setPosition] = useState<"top-right" | "bottom-right">(
    "bottom-right"
  );
  const previousWidthRef = useRef(0);

  function resize() {
    const width = globalThis.window.innerWidth;
    const previousWidth = previousWidthRef.current;
    if (width < breakpoints.sm && previousWidth > breakpoints.sm) {
      setPosition("bottom-right");
    } else if (width > breakpoints.sm && previousWidth < breakpoints.sm) {
      setPosition("top-right");
    }
    previousWidthRef.current = width;
  }

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(resize, 150);
    };

    handleResize();
    globalThis.window.addEventListener("resize", handleResize);
    return () => {
      globalThis.window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  });
  return position;
}

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

export function Toaster(props: Readonly<ToasterProps>) {
  const position = useUpdateToasterPosition();
  return <SonnerToaster {...props} position={position} />;
}

export type ToastTypes =
  | "normal"
  | "action"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "loading"
  | "default";

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

type ToastProps = {
  id: string | number;
  title: string;
  description?: string;
  type: ToastTypes;
};

function Toast(props: Readonly<ToastProps>) {
  const { title, description, type } = props;
  return (
    <div
      className="overlay flex w-full items-center border px-3 py-2"
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
      <button
        title="Close"
        className="w-8 flex-none cursor-pointer rounded-full p-1.25 text-gray-500 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-500"
        onClick={() => {
          sonnerToast.dismiss(props.id);
        }}
      >
        <XCircleIcon />
      </button>
    </div>
  );
}

export type Notification = {
  type: ToastTypes;
  title: string;
  description?: string;
};

export const toast = {
  info: (title: string, description?: string) =>
    sonnerToast.custom(id => (
      <Toast id={id} title={title} description={description} type={"info"} />
    )),
  success: (title: string, description?: string) =>
    sonnerToast.custom(id => (
      <Toast id={id} title={title} description={description} type={"success"} />
    )),
  warning: (title: string, description?: string) =>
    sonnerToast.custom(id => (
      <Toast id={id} title={title} description={description} type={"warning"} />
    )),
  error: (title: string, description?: string) =>
    sonnerToast.custom(id => (
      <Toast id={id} title={title} description={description} type={"error"} />
    )),
  toast: (notification: Notification) =>
    sonnerToast.custom(id => (
      <Toast
        id={id}
        title={notification.title}
        description={notification.description}
        type={notification.type}
      />
    )),
};
