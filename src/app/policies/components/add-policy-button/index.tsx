// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function AddPolicyButton() {
  return (
    <Link href="/policies/new">
      <Button className="btn-secondary">
        <PlusIcon className="my-auto size-5" />
        Add new policy
      </Button>
    </Link>
  );
}
