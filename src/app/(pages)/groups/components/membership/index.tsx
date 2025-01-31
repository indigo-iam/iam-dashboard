import { Section } from "@/components/layout";
import { User } from "@/models/scim";
import AddGroupButton from "./add-group-button";
import JoinGroupButton from "./join-group-button";
import GroupsTable from "./table";
import { Suspense } from "react";
import { auth } from "@/auth";
import { getGroupsPage, getMyGroupsPage } from "@/services/groups";
import { InputQuery } from "@/components/inputs";
import Paginator from "@/components/paginator";

type MembershipGroupsProps = {
  count: number;
  page: number;
  query?: string;
  me?: User;
}

export default async function MembershipGroups(
  props: Readonly<MembershipGroupsProps>
) {
  const { count, page, query, me} = props;
  const startIndex = 1 + count * (page - 1);
  const groupsPage = me ? await getMyGroupsPage(me, count, startIndex, query)
    : await getGroupsPage(count, startIndex, query);
  const numberOfPages = Math.ceil(groupsPage.totalResults / count) || 1;
  const groups = groupsPage.Resources;
  const session = await auth();
  const isAdmin = session?.is_admin ?? false;

  return (
    <Section title={me ? "Membership" : ""}>
      {me ? (
        <JoinGroupButton user={me} isAdmin={isAdmin} />
      ) : (
        <AddGroupButton />
      )}
      <InputQuery />
      <Suspense fallback="Loading membership groups...">
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
