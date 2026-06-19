// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { useState, useEffect, useRef } from "react";

export function useSessionStorage() {
  const [storage, setStorage] = useState<Storage>();

  useEffect(() => {
    (async () => {
      setStorage(sessionStorage);
    })();
  }, []);

  function getItem(key: string) {
    return storage?.getItem(key);
  }

  function setItem(key: string, value: string) {
    storage?.setItem(key, value);
  }

  return { getItem, setItem };
}

export function useDeferredCallback() {
  const timeoutRef = useRef<number>(null);

  function deferredCallback(callback: () => Promise<void>) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = globalThis.window.setTimeout(async () => {
      await callback();
    }, 150);
  }

  return {
    deferredCallback,
  };
}
