// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useTransition } from "react";
import { LoadingContext } from "./context";

type LoadingProviderProps = {
  children: React.ReactNode;
};

export function LoadingProvider(props: Readonly<LoadingProviderProps>) {
  const { children } = props;
  const [isPending, startTransition] = useTransition();

  function startLoadingTransition(callback: () => Promise<void>) {
    startTransition(async () => {
      await callback();
    });
  }

  return (
    <LoadingContext
      value={{
        startLoadingTransition,
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
