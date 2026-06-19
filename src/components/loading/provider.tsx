// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { LoadingContext } from "./context";

// the amount of time to wait before incrementing the progress bar
const TRICKLE_DURATION = 200;

function clamp(x: number, a: number, b: number) {
  return Math.min(Math.max(x, a), b);
}

type LoadingProviderProps = {
  children: React.ReactNode;
};

export function LoadingProvider(props: Readonly<LoadingProviderProps>) {
  const { children } = props;
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);
  const [isProgressBarHidden, setIsProgressBarHidden] = useState(false);
  const pathname = usePathname();
  const progressRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const prevPathnameRef = useRef("");

  async function startLoadingTransition(callback: () => Promise<void>) {
    startTransition(async () => {
      await callback();
    });
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
    if (prevPathnameRef.current === pathname) {
      return;
    }
    stopProgressBar();
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <LoadingContext
      value={{
        startLoadingTransition,
        startProgressBar,
        stopProgressBar,
        isProgressBarHidden,
        progress,
      }}
    >
      {isPending && <Loading />}
      {children}
    </LoadingContext>
  );
}

function Spinner() {
  return (
    <div className="inline-block h-full w-full animate-spin rounded-full border-[6px] border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
      <span className="absolute! -m-px! h-px! w-px! overflow-hidden! border-0! p-0! whitespace-nowrap! [clip:rect(0,0,0,0)]!" />
    </div>
  );
}

function Loading() {
  return (
    <div
      id="loading"
      className="fixed inset-0 z-50 flex items-center bg-gray-600/50 backdrop-blur-sm"
    >
      <div className="m-auto h-16 w-16 text-white">
        <Spinner />
        <p className="mt-8 text-xl text-white">Loading...</p>
      </div>
    </div>
  );
}
