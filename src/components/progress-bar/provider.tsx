// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ProgressBarContext } from "./context";
import { ProgressBar } from "./progress-bar";

// the amount of time to wait before incrementing the progress bar
const TRICKLE_DURATION = 200;

function clamp(x: number, a: number, b: number) {
  return Math.min(Math.max(x, a), b);
}

type ProgressBarProviderProps = {
  children: React.ReactNode;
};

export function ProgressBarProvider(props: Readonly<ProgressBarProviderProps>) {
  const { children } = props;
  const [progress, setProgress] = useState(0);
  const [isProgressBarHidden, setIsProgressBarHidden] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const progressRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const path = searchParams ? `${pathname}?${searchParams}` : pathname;
  const prevPath = useRef("");

  async function startTransition(callback: () => Promise<void>) {
    startProgressBar();
    await callback();
    stopProgressBar();
  }

  function trickle() {
    if (progressRef.current < 1) {
      increment();
    }
  }

  async function startProgressBar() {
    progressRef.current = 0;
    timerRef.current = setInterval(trickle, TRICKLE_DURATION);
    setIsProgressBarHidden(false);
  }

  async function stopProgressBar() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setProgress(1);
    setTimeout(() => {
      setIsProgressBarHidden(true);
      setProgress(0);
    }, TRICKLE_DURATION);
  }

  function increment() {
    let amount = 0;
    const n = progressRef.current;
    if (n >= 0 && n < 0.2) {
      amount = 0.1;
    } else if (n >= 0.2 && n < 0.5) {
      amount = 0.04;
    } else if (n >= 0.5 && n < 0.8) {
      amount = 0.02;
    } else if (n >= 0.8 && n < 0.99) {
      amount = 0.005;
    } else {
      amount = 0;
    }
    progressRef.current = clamp(n + amount, 0, 1);
    setProgress(progressRef.current);
  }

  useEffect(() => {
    if (prevPath.current === path) {
      return;
    }
    stopProgressBar();
    prevPath.current = path;
  }, [path]);
  return (
    <ProgressBarContext
      value={{
        startTransition,
        startProgressBar,
        stopProgressBar,
        isProgressBarHidden,
        progress,
      }}
    >
      {children}
    </ProgressBarContext>
  );
}
