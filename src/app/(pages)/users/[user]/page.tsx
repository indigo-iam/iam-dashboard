import { auth } from "@/auth";
import { Page, Panel, Section } from "@/components/Layout";
import { fetchMe } from "@/services/me";
import { fetchUser } from "@/services/users";
import UserInfo from "./components/Info";
import { Certificates } from "./components/Certificates";
import { GroupRequests } from "./components/GroupRequests";
import { Groups } from "./components/Groups";
import { LinkedAccounts } from "./components/LinkedAccounts";
import SSHKeys from "./components/SSHKeys";
import Attributes from "./components/Attributes";

type UserPageProps = {
  params: { user: string };
};

export default async function UserPage(props: Readonly<UserPageProps>) {
  const { params } = props;
  const userId = params.user;
  const session = await auth();
  const isAdmin = session?.is_admin ?? false;
  const isMe = userId === "me";
  const user = isMe ? await fetchMe() : await fetchUser(userId);

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <Page title={user.name?.formatted}>
      <Panel>
        <UserInfo user={user} isMe={isMe} />
        <Groups user={user} isAdmin={isAdmin} />
        <GroupRequests user={user} isMe={isMe} />
        <LinkedAccounts user={user} />
        <Certificates user={user} />
        <SSHKeys user={user} />
        <Attributes user={user} />
      </Panel>
    </Page>
  );
}
