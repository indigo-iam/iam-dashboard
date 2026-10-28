// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useCallback, useMemo, useState } from "react";

import { ToasterContext } from "./context";
import { Toast, ToastProps, ToastTypes } from "./toast";

type ToasterProviderProps = {
  children?: React.ReactNode;
};

export function ToasterProvider(props: Readonly<ToasterProviderProps>) {
  const { children } = props;
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  function toast(options: {
    title: string;
    description?: string;
    type: ToastTypes;
  }) {
    const newToast: ToastProps = {
      id: Date.now(),
      title: options.title,
      description: options.description,
      type: options.type,
    };
    setToasts(previousToasts => [...previousToasts, newToast]);
  }

  const success = useCallback((title: string, description?: string) => {
    toast({ title, description, type: "success" });
  }, []);

  const warning = useCallback((title: string, description?: string) => {
    toast({ title, description, type: "warning" });
  }, []);

  const error = useCallback((title: string, description?: string) => {
    toast({ title, description, type: "error" });
  }, []);

  function close(id: number) {
    setToasts(previousToasts => previousToasts.filter(t => t.id !== id));
  }

  const contextValue = useMemo(
    () => ({ toast, success, warning, error, close }),
    [success, warning, error]
  );

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
      <div className="fixed top-8 right-8 z-50 flex flex-col gap-2">
        {toasts &&
          toasts.map(t => {
            return <Toast {...t} key={t.id} />;
          })}
      </div>
    </ToasterContext.Provider>
  );
}
