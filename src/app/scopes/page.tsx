// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Layout } from "@/app/components/layout";
import Paginator from "@/components/paginator";
import { InputQuery } from "@/components/inputs";
import { fetchPaginatedScopes } from "@/services/scopes";
import { NewScopeButton, ScopesTable } from "./components";

type ScopeProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
  }>;
};

export default async function Scopes(props: Readonly<ScopeProps>) {
  const searchParams = await props.searchParams;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = count * (page - 1);
  const scopes = await fetchPaginatedScopes(count, startIndex, query);
  const numberOfPages = Math.ceil(scopes.totalResults / count);

  return (
    <Layout title="Scopes">
      <div className="space-y-4">
        <NewScopeButton />
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
    </Layout>
  );
}
