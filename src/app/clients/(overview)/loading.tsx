// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { InputQuery } from "@/components/inputs";
import { PlusIcon, CubeIcon } from "@heroicons/react/24/solid";
import Paginator from "@/components/paginator";
import { Button } from "@/components/buttons";
import { LoadingList } from "@/components/loading";
import { isUserAdmin } from "@/auth";

function Buttons() {
  return (
    <div className="flex flex-row gap-2">
      <Button className="btn-secondary" tabIndex={-1} disabled>
        <PlusIcon className="size-4" />
        New client
      </Button>
      <Button className="btn-secondary" disabled>
        Redeem
      </Button>
    </div>
  );
}

export default async function Loading() {
  const isAdmin = await isUserAdmin();
  return (
    <section>
      <header className="section-header flex flex-wrap gap-2">
        <div className="flex grow items-center gap-2">
          <CubeIcon className="size-5" />
          <h2 className="text-base font-normal">
            {isAdmin ? "Clients" : "My clients"}
          </h2>
        </div>
        <InputQuery
          disabled
          title="Search client"
          placeholder="Type to search a client"
          data-testid="search-client"
          aria-label="Search client"
        />
        <Buttons />
      </header>
      <div className="container space-y-4">
        <LoadingList />
        <Paginator numberOfPages={0} />
      </div>
    </section>
  );
}
