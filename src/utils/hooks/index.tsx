// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { useState, useEffect, useRef } from "react";

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

export function useDisabled() {
  const [disabled, setDisabled] = useState(true);
  const lock = useRef(false);

  useEffect(() => {
    if (!lock.current) {
      setDisabled(false);
      lock.current = true;
    }
  }, []);

  return disabled;
}

export function useTimeout(callbackFn: () => void, delay: number) {
  const callbackRef = useRef(callbackFn);

  useEffect(() => {
    callbackRef.current = callbackFn;
  }, [callbackFn]);

  useEffect(() => {
    setTimeout(() => callbackRef.current(), delay);
  });
}
