// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect } from "next/navigation";
import { UserGroupIcon } from "@heroicons/react/24/solid";

import { getSession, isUserAdmin } from "@/auth";
import { InputQuery } from "@/components/inputs";
import { LoadingList } from "@/components/loading";
import Paginator from "@/components/paginator";
import { AddGroupButton } from "./components";

export default async function GroupsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  return (
    <section>
      <header className="section-header flex flex-wrap gap-2">
        <div className="flex grow items-center gap-2">
          <UserGroupIcon className="size-5" />
          <h2 className="text-base font-normal">
            {isAdmin ? "Groups" : "My groups"}
          </h2>
        </div>
        <InputQuery
          title="Search group"
          placeholder="Type to search a group"
          data-testid="search-group"
          aria-label="Search group"
        />
        <AddGroupButton />
      </header>
      <div className="container space-y-4">
        <LoadingList />
        <Paginator numberOfPages={0} />
      </div>
    </section>
  );
}
