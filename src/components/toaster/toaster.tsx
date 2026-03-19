// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Notification, NotificationType } from "./types";

export default function MyToaster(
  props: Readonly<{ notification?: Notification }>
) {
  const { notification } = props;

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
  return <Toaster position="top-right" />;
}

let Icon = (props: Readonly<{ type: NotificationType }>) => {
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
        <CheckCircleIcon key="check-icon" className="text-success size-6" />
      );
    case "warning":
      return (
        <ExclamationTriangleIcon
          key="danger-icon"
          className="text-warning size-6"
        />
      );
    case "error":
      return (
        <ExclamationCircleIcon
          key="danger-circle-icon"
          className="text-danger size-6"
        />
      );
  }
};

const CustomToast = (props: {
  title: string;
  subtitle?: string;
  dismiss: () => void;
  type: NotificationType;
}) => {
  const { title, subtitle, dismiss, type } = props;
  return (
    <div className="w-80" data-testid="toast">
      <div className="overlay flex w-full items-center border p-3">
        <div className="flex grow items-center gap-2">
          <Icon type={type} />
          <div>
            <p className="text-normal font-semibold">{title}</p>
            <p className="block text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        <button
          title="Close"
          className="w-8 cursor-pointer rounded-full p-1.25 text-gray-500 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-500"
          onClick={dismiss}
        >
          <XCircleIcon />
        </button>
      </div>
    </div>
  );
};

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
