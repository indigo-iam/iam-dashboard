// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

function Spinner() {
  return (
    <div className="inline-block h-full w-full animate-spin rounded-full border-[6px] border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
      <span className="absolute! -m-px! h-px! w-px! overflow-hidden! border-0! p-0! whitespace-nowrap! [clip:rect(0,0,0,0)]!" />
    </div>
  );
}

export function Loading() {
  return (
    <div
      id="loading"
      className="invisible fixed inset-0 z-50 flex items-center bg-gray-600/50 backdrop-blur-sm data-loading:visible"
    >
      <div className="m-auto h-16 w-16 text-white">
        <Spinner />
        <p className="mt-8 text-xl text-white">Loading...</p>
      </div>
    </div>
  );
}
