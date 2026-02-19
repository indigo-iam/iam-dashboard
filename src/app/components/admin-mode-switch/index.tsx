// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Switch from "./switch";
import { signInWithRole } from "./actions";

function Spinner() {
  return (
    <div className="inline-block h-full w-full animate-spin rounded-full border-[6px] border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
      <span className="absolute! -m-px! h-px! w-px! overflow-hidden! border-0! p-0! whitespace-nowrap! [clip:rect(0,0,0,0)]!" />
    </div>
  );
}

function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-gray-600/50 backdrop-blur-sm">
      <div className="text-secondary mx-auto mt-48 h-16 w-16">
        <Spinner />
        <p className="text-secondary mt-8 text-xl">Loading...</p>
      </div>
    </div>
  );
}

type AdminModeSwitchProps = {
  defaultChecked: boolean;
};

export function AdminModeSwitch(props: Readonly<AdminModeSwitchProps>) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { defaultChecked } = props;

  function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      const role = formData.get("admin_mode") === "on" ? "admin" : "default";
      const url = await signInWithRole(role);
      router.push(url);
    });
  }

  return (
    <>
      {isPending && <Loading />}
      <form className="flex gap-2" onSubmit={onSubmit}>
        <span className="text-sm whitespace-nowrap">Admin Mode</span>
        <Switch defaultChecked={defaultChecked} />
      </form>
    </>
  );
}
