// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Panel } from "@/components/layout";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";

export function NoRequests() {
  return (
    <Panel>
      <div className="pt-16 pb-8">
        <EnvelopeOpenIcon className="m-auto size-16 text-gray-400" />
        <p className="mt-2 text-center">There are no incoming requests</p>
      </div>
    </Panel>
  );
}
