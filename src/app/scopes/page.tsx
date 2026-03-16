// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import Paginator from "@/components/paginator";
import { InputQuery } from "@/components/inputs";
import { fetchPaginatedScopes } from "@/services/scopes";
import { NewScopeButton, ScopesTable } from "./components";
import { redirect } from "next/navigation";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

type ScopeProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
  }>;
};

export default async function Scopes(props: Readonly<ScopeProps>) {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    redirect("/");
  }
  const searchParams = await props.searchParams;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = count * (page - 1);
  const scopes = await fetchPaginatedScopes(count, startIndex, query);
  const numberOfPages = Math.ceil(scopes.totalResults / count);
  return (
    <section className="container">
      <header className="section-header">
        <div className="flex grow gap-2">
          <ClipboardDocumentCheckIcon className="size-5" />
          <h2 className="text-base font-normal">Scopes</h2>
        </div>
        <NewScopeButton />
      </header>
      <div className="content space-y-4">
        <InputQuery
          title="Search scope"
          placeholder="Type to search a scope"
          data-testid="search-scope"
          aria-label="Search scope"
        />
        <div className="panel">
          <ScopesTable scopes={scopes.Resources} />
        </div>
        <Paginator numberOfPages={numberOfPages} />
      </div>
    </section>
  );
}
