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
        <InformationCircleIcon key="circle-icon" className="text-primary" />
      );
    case "success":
      return <CheckCircleIcon key="check-icon" className="text-success" />;
    case "warning":
      return (
        <ExclamationTriangleIcon key="danger-icon" className="text-warning" />
      );
    case "error":
      return (
        <ExclamationCircleIcon
          key="danger-circle-icon"
          className="size-6 text-danger"
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
    <div className={"flex w-96"}>
      <div className="text:primary w-full rounded-lg border border-gray-300 bg-white p-3 shadow-lg dark:border-gray-800 dark:bg-slate-800 dark:text-secondary">
        <div className="flex w-full items-center">
          <div className="mr-4 w-5">
            <Icon type={type} />
          </div>
          <div className="ml-2 mr-6">
            <span className="font-semibold">{title}</span>
            <span className="block text-gray-500">{subtitle}</span>
          </div>
          <div className="m-auto mr-0">
            <button
              className="w-8 rounded-full p-[5px] text-neutral-500 hover:bg-secondary dark:hover:bg-primary-hover"
              onClick={dismiss}
            >
              <XCircleIcon />
            </button>
          </div>
        </div>
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