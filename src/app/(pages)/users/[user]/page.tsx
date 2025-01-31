import { Page, Panel } from "@/components/layout";
import { fetchMe } from "@/services/me";
import { fetchUser } from "@/services/users";
import {
  Attributes,
  Certificates,
  Groups,
  GroupRequests,
  LinkedAccounts,
  ManagedGroups,
  SSHKeys,
  UserInfo,
} from "./components";

type UserPageProps = {
  params: Promise<{ user: string }>;
};

export default async function UserPage(props: Readonly<UserPageProps>) {
  const userId = (await props.params).user;
  const isMe = userId === "me";
  const user = isMe ? await fetchMe() : await fetchUser(userId);

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <Page title={user.name?.formatted}>
      <Panel>
        <UserInfo user={user} isMe={isMe} />
        {!isMe && <Groups user={user} />}
        <GroupRequests user={user} isMe={isMe} />
        {!isMe && <ManagedGroups user={user} />}
        <LinkedAccounts user={user} />
        <Certificates user={user} />
        <SSHKeys user={user} />
        <Attributes user={user} />
      </Panel>
    </Page>
  );
}
