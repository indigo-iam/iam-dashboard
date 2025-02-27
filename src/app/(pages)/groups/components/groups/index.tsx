import { Section } from "@/components/layout";
import { ScimReference, User } from "@/models/scim";
import AddGroupButton from "./add-group-button";
import JoinGroupButton from "./join-group-button";
import GroupsTable from "./table";
import { Suspense } from "react";
import { auth } from "@/auth";
import { getGroupsPage } from "@/services/groups";
import { InputQuery } from "@/components/inputs";
import Paginator from "@/components/paginator";
import { Paginated } from "@/models/pagination";
import { makeScimReferenceFromGroup } from "@/utils/scim";

type GroupsProps = {
  count: number;
  page: number;
  query?: string;
  me?: User;
}

function paginateMyGroups(
  me: User,
  count: number,
  startIndex: number = 1,
  filter?: string
) {
  let scimGroups = me.groups ?? [];
  if (filter) {
    scimGroups = scimGroups.filter(g => g.display.includes(filter));
  }
  const myGroups: Paginated<ScimReference> = {
    totalResults: scimGroups.length,
    itemsPerPage: count,
    startIndex: startIndex,
    Resources: scimGroups.slice(startIndex - 1, startIndex - 1 + count)
  };
  return myGroups;
}

async function getScimGroupPage(
  count: number,
  startIndex: number = 1,
  filter?: string
) {
  const groups = await getGroupsPage(count, startIndex, filter);
  const scimGroups = groups.Resources.map(group => makeScimReferenceFromGroup(group))
  const scimGroupsPage: Paginated<ScimReference> = {
    totalResults: groups.totalResults,
    itemsPerPage: groups.itemsPerPage,
    startIndex: groups.startIndex,
    Resources: scimGroups
  };
  return scimGroupsPage;
}

export default async function Groups(
  props: Readonly<GroupsProps>
) {
  const { count, page, query, me } = props;
  const startIndex = 1 + count * (page - 1);
  const groupsPage = me ? paginateMyGroups(me, count, startIndex, query)
    : await getScimGroupPage(count, startIndex, query);
  const numberOfPages = Math.ceil(groupsPage.totalResults / count) || 1;
  const groups = groupsPage.Resources;
  const session = await auth();
  const isAdmin = session?.is_admin ?? false;

  return (
    <Section title={me ? "Membership" : "All groups"}>
      {me ? (
        <JoinGroupButton user={me} isAdmin={isAdmin} />
      ) : (
        <AddGroupButton />
      )}
      <InputQuery />
      <Suspense fallback="Loading groups...">
        <GroupsTable
          groups={groups}
          isAdmin={isAdmin}
          user={me}
        />
      </Suspense>
      <Paginator numberOfPages={numberOfPages} />
    </Section>
  );
}
