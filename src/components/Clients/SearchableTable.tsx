"use client";
import { getClientsPage } from "@/services/clients";
import { Client } from "@/models/client";
import React, { useCallback, useEffect, useState } from "react";
import { Paginator } from "@/components/Table";
import { InputSearch } from "@/components/Inputs";
import ClientsTable from "./Table";

type SearchableTableProps = { count?: string; page?: string; me?: boolean };

type ClientPage = {
  clients: Client[];
  numberOfPages: number;
};

export default function SearchableTable(props: Readonly<SearchableTableProps>) {
  const { count, page, me } = props;
  const [filter, setFilter] = useState<string>();
  const [clientPage, setClientPage] = useState<ClientPage>({
    clients: [],
    numberOfPages: 0,
  });

  let itemsPerPage = 10;
  let currentPage = 0;

  itemsPerPage = count ? parseInt(count) || itemsPerPage : itemsPerPage;
  currentPage = page ? parseInt(page) - 1 || currentPage : currentPage;

  const startIndex = currentPage * itemsPerPage + 1;

  const fetchGroups = useCallback(
    async (filter?: string) => {
      const response = await getClientsPage(
        itemsPerPage,
        startIndex,
        me,
        filter
      );
      const { totalResults } = response;
      setClientPage({
        clients: response.Resources,
        numberOfPages: Math.ceil(totalResults / itemsPerPage),
      });
    },
    [filter]
  );

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleFilterChange = (filter: string) => {
    fetchGroups(filter);
  };
  const handleFilterClear = () => fetchGroups();

  return (
    <>
      {me ? null : (
        // TODO: my clients are not filtrable, thus hide the search bar
        <InputSearch
          onChange={handleFilterChange}
          onClear={handleFilterClear}
        />
      )}
      <ClientsTable clients={clientPage.clients} />
      <Paginator numberOfPages={clientPage.numberOfPages} />
    </>
  );
}
