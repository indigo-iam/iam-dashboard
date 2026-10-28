// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useCallback, useMemo, useState } from "react";

import { ToasterContext } from "./context";
import {
  Toast,
  TOAST_EXIT_DURATION,
  type ToastProps,
  type ToastTypes,
} from "./toast";

let nextToastId = 0;

function generateToastId() {
  nextToastId += 1;
  return nextToastId;
}

type ToasterProviderProps = {
  children?: React.ReactNode;
};

export function ToasterProvider(props: Readonly<ToasterProviderProps>) {
  const { children } = props;
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [closingIds, setClosingIds] = useState<Set<number>>(new Set());

  const toast = useCallback(
    (options: { title: string; description?: string; type: ToastTypes }) => {
      const newToast: ToastProps = {
        id: generateToastId(),
        title: options.title,
        description: options.description,
        type: options.type,
      };
      setToasts(previousToasts => [...previousToasts, newToast]);
    },
    []
  );

  const success = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: "success" });
    },
    [toast]
  );

  const warning = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: "warning" });
    },
    [toast]
  );

  const error = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: "error" });
    },
    [toast]
  );

  const close = useCallback((id: number) => {
    setClosingIds(previousIds => {
      if (previousIds.has(id)) {
        return previousIds;
      }
      const nextIds = new Set(previousIds);
      nextIds.add(id);
      return nextIds;
    });
    setTimeout(() => {
      setToasts(previousToasts => previousToasts.filter(t => t.id !== id));
      setClosingIds(previousIds => {
        const nextIds = new Set(previousIds);
        nextIds.delete(id);
        return nextIds;
      });
    }, TOAST_EXIT_DURATION);
  }, []);

  const contextValue = useMemo(
    () => ({ toast, success, warning, error, close }),
    [toast, success, warning, error, close]
  );

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
      <div className="fixed top-8 right-8 z-50 min-h-fit">
        <div className="flex flex-col gap-2">
          {toasts.map(t => {
            return <Toast key={t.id} {...t} closing={closingIds.has(t.id)} />;
          })}
        </div>
      </div>
    </ToasterContext.Provider>
  );
}
