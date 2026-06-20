// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { LinkSlashIcon } from "@heroicons/react/24/outline";
import { Option, Options } from "@/components/options";

export default function CertificateOptions() {
  return (
    <Options>
      <Option data-danger>
        <div className="flex items-center gap-2">
          <LinkSlashIcon className="size-5" />
          <span>Unlink certificate</span>
        </div>
      </Option>
    </Options>
  );
}
