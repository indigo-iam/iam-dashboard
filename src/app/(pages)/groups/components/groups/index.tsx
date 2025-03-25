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

function paginateUserGroups(
  user: User,
  count: number,
  startIndex: number = 1,
  filter?: string
): Paginated<ScimReference> {
  let scimGroups = user.groups ?? [];
  if (filter) {
    scimGroups = scimGroups.filter(g => g.display.includes(filter));
  }
  return {
    totalResults: scimGroups.length,
    itemsPerPage: count,
    startIndex: startIndex,
    Resources: scimGroups.slice(startIndex - 1, startIndex - 1 + count),
  };
}

async function getScimGroupPage(
  count: number,
  startIndex: number = 1,
  filter?: string
): Promise<Paginated<ScimReference>> {
  const groups = await getGroupsPage(count, startIndex, filter);
  const scimGroups = groups.Resources.map(group =>
    makeScimReferenceFromGroup(group)
  );
  return {
    totalResults: groups.totalResults,
    itemsPerPage: groups.itemsPerPage,
    startIndex: groups.startIndex,
    Resources: scimGroups,
  };
}

type GroupsProps = {
  count: number;
  page: number;
  query?: string;
  user?: User;
};

export default async function Groups(props: Readonly<GroupsProps>) {
  const { count, page, query, user } = props;
  const startIndex = 1 + count * (page - 1);
  const groupsPage = user
    ? paginateUserGroups(user, count, startIndex, query)
    : await getScimGroupPage(count, startIndex, query);
  const numberOfPages = Math.ceil(groupsPage.totalResults / count) || 1;
  const groups = groupsPage.Resources;
  const session = await auth();
  const isAdmin = session?.is_admin ?? false;

  return (
    <Section title={user ? "Membership" : "All groups"}>
      {user ? (
        <JoinGroupButton user={user} isAdmin={isAdmin} />
      ) : (
        <AddGroupButton />
      )}
      <InputQuery data-test="search-group"/>
      <Suspense fallback="Loading groups...">
        <GroupsTable groups={groups} isAdmin={isAdmin} user={user} />
      </Suspense>
      <Paginator numberOfPages={numberOfPages} />
    </Section>
  );
}
