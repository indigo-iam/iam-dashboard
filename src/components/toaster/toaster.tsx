// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Notification, NotificationType } from "./types";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

function useUpdateToasterPosition() {
  const [position, setPosition] = useState<"top-right" | "bottom-right">(
    "bottom-right"
  );

  function resize() {
    const width = window.innerWidth;
    if (width < breakpoints.sm) {
      setPosition("bottom-right");
    } else {
      setPosition("top-right");
    }
  }

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(resize, 150);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  });
  return position;
}

export default function MyToaster(
  props: Readonly<{ notification?: Notification }>
) {
  const { notification } = props;
  const position = useUpdateToasterPosition();

  useEffect(() => {
    if (!notification) {
      return;
    }
    toast.custom(t => (
      <CustomToast
        title={notification.message}
        subtitle={notification.subtitle}
        dismiss={() => toast.dismiss(t)}
        type={notification.type}
      />
    ));
  }, [notification]);
  return <Toaster position={position} />;
}

type IconProps = {
  type: NotificationType;
};

function Icon(props: Readonly<IconProps>) {
  const { type } = props;
  switch (type) {
    case "info":
      return (
        <InformationCircleIcon
          key="circle-icon"
          className="size-6 text-gray-950"
        />
      );
    case "success":
      return (
        <CheckCircleIcon
          key="check-icon"
          className="text-success size-6 flex-none"
        />
      );
    case "warning":
      return (
        <ExclamationTriangleIcon
          key="danger-icon"
          className="text-warning size-6 flex-none"
        />
      );
    case "error":
      return (
        <ExclamationCircleIcon
          key="danger-circle-icon"
          className="text-danger size-6 flex-none"
        />
      );
  }
}

type CustomToastProps = {
  title: string;
  subtitle?: string;
  dismiss: () => void;
  type: NotificationType;
};

function CustomToast(props: Readonly<CustomToastProps>) {
  const { title, subtitle, dismiss, type } = props;
  return (
    <div
      className="overlay flex w-full items-center border px-3 py-2"
      data-testid="toast"
    >
      <div className="flex grow items-center gap-2">
        <Icon type={type} />
        <div>
          <p className="text-normal font-semibold">{title}</p>
          <p className="block text-sm text-gray-500 dark:text-gray-300">
            {subtitle}
          </p>
        </div>
      </div>
      <button
        title="Close"
        className="w-8 flex-none cursor-pointer rounded-full p-1.25 text-gray-500 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-500"
        onClick={dismiss}
      >
        <XCircleIcon />
      </button>
    </div>
  );
}

export const toaster = {
  info: (message: string, subtitle?: string) =>
    toast.custom(t => (
      <CustomToast
        title={message}
        subtitle={subtitle}
        dismiss={() => toast.dismiss(t)}
        type="info"
      />
    )),
  success: (message: string, subtitle?: string) =>
    toast.custom(t => (
      <CustomToast
        title={message}
        subtitle={subtitle}
        dismiss={() => toast.dismiss(t)}
        type="success"
      />
    )),
  warning: (message: string, subtitle?: string) =>
    toast.custom(t => (
      <CustomToast
        title={message}
        subtitle={subtitle}
        dismiss={() => toast.dismiss(t)}
        type="warning"
      />
    )),
  error: (message: string, subtitle?: string) =>
    toast.custom(t => (
      <CustomToast
        title={message}
        subtitle={subtitle}
        dismiss={() => toast.dismiss(t)}
        type="error"
      />
    )),
};
