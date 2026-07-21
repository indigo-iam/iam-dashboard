// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

function FormItem() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-3 w-2/6 rounded-full bg-neutral-100" />
      <div className="h-8 w-full rounded bg-neutral-100" />
      <div className="h-2 w-1/6 rounded-full bg-neutral-100" />
    </div>
  );
}

export function LoadingForm() {
  return (
    <div className="panel">
      <div className="flex flex-col gap-8 pb-4 lg:flex-row">
        <div className="w-full space-y-2 text-sm font-light lg:w-1/3">
          <div className="h-3 w-full rounded-full bg-neutral-100" />
          <div className="h-12 w-full rounded bg-neutral-100" />
        </div>
        <div className="w-full space-y-4 lg:w-2/3">
          <FormItem />
          <FormItem />
          <FormItem />
        </div>
      </div>
    </div>
  );
}
